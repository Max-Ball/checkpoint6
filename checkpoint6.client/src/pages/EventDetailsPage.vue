<template>
  <div class="row justify-content-center m-2">
    <div class="col-md-12">
      <div class="row bg-dark p-3 mb-5">
        <div class="col-md-5">
          <img class="img-fluid" :src="event.coverImg" alt="">
        </div>
        <div class="col-md-7 d-flex flex-column justify-content-between">
          <div>
            <h5 class="text-end">{{ new Date(event.startDate).toLocaleDateString() }}</h5>
            <h4>{{ event.name }}</h4>
            <h6>{{ event.location }}</h6>
            <p>{{ event.description }}</p>
          </div>
          <div>
            <h6 class="text-end">Available Tickets: {{ event.capacity }}</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-dark p-3">
      <div v-for="t in tickets" :key="t.id">
        <Ticket :ticket="t" />
      </div>
    </div>
    <div class="col-md-9 bg-dark my-3 p-4">
      <CommentForm />
      <div>

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
      tickets: computed(() => AppState.ticketHolders)
    };
  },
  components: { Ticket }
};
</script>



<style scoped lang="scss">
</style>