<template>
  <h1 class="my-2 title-font">Tower Events</h1>
  <div class="row justify-content-center m-5">
    <!--div below is where I need to hit grayscale css-->
    <div :class="{ grayscale: event.isCanceled }">
      <div class="col-md-12">
        <div class="row bg-card custom-text p-3 mb-5 rounded elevation-5">
          <div class="col-md-5">
            <img class="img-fluid rounded" :src="event.coverImg" alt="">
          </div>
          <div class="col-md-7 d-flex flex-column justify-content-between">
            <div>
              <i v-if="event.creatorId == account.id" class="mdi mdi-delete fs-5 dropdown-item selectable text-end"
                @click="deleteEvent(event.id)" title="Delete Event"></i>
              <h4 class="text-end">{{ new Date(event.startDate).toLocaleDateString() }}</h4>
              <h1 class="m-0 accent-font">{{ event.name }}</h1>
              <h2 class="m-0">{{ event.location }}</h2>
              <h4 class="">{{ event.description }}</h4>
            </div>
            <div class="text-end">
              <h5>Available Tickets: <span class="accent-font fs-1 ps-2"> {{ event.capacity }}</span></h5>
              <div v-if="event.isCanceled">
                <button class="btn btn-warning my-1" disabled>
                  Event Canceled
                </button>
              </div>
              <div v-else-if="event.capacity > 0 && !isAttending">
                <button class="btn btn-primary my-1 elevation-4 rounded-pill" @click="attendEvent()"
                  title="Attend Event">
                  <h4 class="m-1">Attend Event</h4>
                </button>
              </div>
              <div v-else-if="event.capacity <= -1">
                <button class="btn btn-danger my-1 elevation-4 rounded-pill" disabled>
                  <h4 class="m-0">Event Over Capacity!</h4>
                </button>
              </div>
              <div v-else-if="event.capacity == 0">
                <button class="btn btn-warning my-1 elevation-4 rounded-pill" disabled>
                  <h4 class="m-0">Sold Out!</h4>
                </button>
              </div>
              <div v-else>
                <button class="btn btn-danger my-1 elevation-4 rounded-pill" @click="refundTicket()">
                  <h4 class="m-0">Refund your Ticket</h4>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid bg-card rounded elevation-5 p-3 d-flex align-items-center">
        <h2 v-if="event.isCanceled == false" class="me-2 accent-font my-0">See who is attending this event:</h2>
        <h2 v-else class="me-2 my-0 accent-font">See who was going to attend this event:</h2>
        <div v-for="t in tickets" :key="t.id">
          <Ticket :ticket="t" />
        </div>
      </div>
      <div :class="{ invisible: event.isCanceled }">
        <div class="col-md-8 offset-md-2 bg-card rounded elevation-5 my-3 p-4">
          <CommentForm />
          <div v-for="c in comments" :key="c.id">
            <CommentCard :comment="c" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>



<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { eventsService } from '../services/EventsService';
import { ticketsService } from '../services/TicketsService';
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import Ticket from '../components/Ticket.vue';
import { router } from '../router';

export default {
  setup() {
    const route = useRoute();

    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId);
      }
      catch (error) {
        logger.log("[getting event by id]", error);
        Pop.error;
      }
    }
    async function getTicketHolders() {
      try {
        await ticketsService.getTicketHolders(route.params.eventId);
      }
      catch (error) {
        logger.error("[getting ticketholders of event]", error);
        Pop.error;
      }
    }

    async function getComments() {
      try {
        await commentsService.getComments(route.params.eventId)
      } catch (error) {
        logger.error('[getting comments of event]', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getEventById();
      getTicketHolders();
      getComments();
    });
    return {
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.ticketHolders),
      isAttending: computed(() => {
        if (AppState.ticketHolders.find(t => t.accountId == AppState.account.id)) {
          return true
        }
        return false
      }),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      cover: computed(() => `url(${AppState.events?.coverImg})`),

      async attendEvent() {
        try {
          let newTicket = {
            eventId: AppState.activeEvent.id,
            accountId: AppState.account.id
          }
          await ticketsService.attendEvent(newTicket)
        } catch (error) {
          logger.error('[attending event]', error)
          Pop.error(error)
        }
      },

      async refundTicket() {
        try {
          const refundedTicket = AppState.ticketHolders.find(t => t.accountId == AppState.account.id)
          await ticketsService.refundTicket(refundedTicket.id)
        } catch (error) {
          logger.error('[refunding ticket]', error)
          Pop.error(error)
        }
      },

      async deleteEvent() {
        try {
          const yes = await Pop.confirm('Are you sure you want to cancel this event?')
          if (!yes) {
            return
          }
          await eventsService.deleteEvent(route.params.eventId)
          router.push({ name: 'Home' })
        } catch (error) {
          logger.error('[deleting event]', error)
          Pop.error(error)
        }
      }
    };
  },
  components: { Ticket }
};
</script>



<style scoped lang="scss">
.grayscale {
  filter: grayscale(1);
}



.title-font {
  font-family: 'Righteous', cursive;
  font-size: 4em;
  color: rgb(240, 192, 0);
  text-shadow: 2px 2px 2px rgb(31, 29, 29);
}

.cover-img {
  height: 500px;
  background-position: center;
  background-size: cover;
  display: grid;
  place-content: center;
  background-image: v-bind(cover);
}
</style>