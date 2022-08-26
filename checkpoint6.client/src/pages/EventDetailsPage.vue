<template>
  <div class="my-2 title-font">Tower Events</div>
  <div class="row justify-content-center m-3">
    <!--div below is where I need to hit grayscale css-->
    <div :class="{ grayscale: event.isCanceled }">
      <div class="col-md-12">
        <div class="row cover-img custom-text p-3 mb-5 rounded elevation-5">
          <div class="col-md-12 glass-card rounded p-3">
            <div class="row">
              <div class="col-md-5">
                <img class="img-fluid rounded" :src="event.coverImg" alt="Event Image" title="Event Image">
              </div>
              <div class="col-md-7 d-flex flex-column justify-content-between">
                <div class="text-start">
                  <div class="text-end">
                    <i v-if="event.creatorId == account.id" class="mdi mdi-delete fs-5 selectable"
                      @click="deleteEvent(event.id)" title="Delete Event"></i>
                  </div>
                  <h4 class="text-end">{{ new Date(event.startDate).toLocaleDateString() }}</h4>
                  <h1 class="m-0 accent-font">{{ event.name }}</h1>
                  <h2 class="m-0">{{ event.location }}</h2>
                  <div class="fs-4">{{ event.description }}</div>
                </div>
                <div class="text-end">
                  <div class="fs-4">Available Tickets: <span class="accent-font ps-2"> {{ event.capacity }}</span></div>
                  <div v-if="event.isCanceled">
                    <button class="btn btn-warning my-1" disabled>
                      Event Canceled
                    </button>
                  </div>
                  <div v-else-if="event.capacity > 0 && !isAttending">
                    <button class="btn my-1 btn-attend elevation-4 rounded-pill" @click="attendEvent()"
                      title="Attend Event">
                      <div class="m-1 fs-4">Attend Event</div>
                    </button>
                  </div>
                  <div v-else-if="event.capacity <= -1">
                    <button class="btn custom-button my-1 elevation-4 rounded-pill" disabled
                      title="Event Over Capacity">
                      <div class="m-0 fs-4">Event Over Capacity!</div>
                    </button>
                  </div>
                  <div v-else-if="event.capacity == 0">
                    <button class="btn custom-button my-1 elevation-4 rounded-pill" disabled title="Sold Out!">
                      <div class="m-0 fs-4">Sold Out!</div>
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn custom-button my-1 elevation-4 rounded-pill" @click="refundTicket()"
                      title="Refund Ticket">
                      <div class="m-0 fs-4">Refund your Ticket</div>
                    </button>
                  </div>
                </div>
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
      cover: computed(() => `url(${AppState.activeEvent?.coverImg})`),

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
  min-height: 500px;
  background-position: center;
  background-size: cover;
  display: grid;
  background-image: v-bind(cover);
}

.glass-card {
  background: rgba(76, 66, 66, 0.4);
  backdrop-filter: blur(5px);
  text-shadow: 2px 2px 2px rgb(31, 29, 29);
  color: #f2e9e4 !important;
  width: 100%;
}

.custom-button {
  background-color: rgb(178, 0, 0) !important;
  color: #ffffff !important;
}

.custom-button:hover {
  scale: 1.1;
}

.btn-attend {
  background-color: rgb(240, 192, 0) !important;
  color: #171a1f !important;
  border: none !important;
}

.btn-attend:hover {
  scale: 1.1;
  color: #171a1f !important;
}
</style>