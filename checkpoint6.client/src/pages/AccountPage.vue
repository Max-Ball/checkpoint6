<template>
  <h1 class="my-2 title-font">Tower Events</h1>
  <div class="row">
    <h1 class="accent-font mt-4 p-3">MY EVENTS</h1>
    <div class="col-md-12">
      <div class="row">
        <div v-for="t in tickets" :key="t.id" class="col-md-3">
          <UserTickets :ticket="t" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import UserTickets from '../components/UserTickets.vue'
export default {
  name: "Account",
  setup() {
    async function getTicketsByAccountId() {
      try {
        await ticketsService.getTicketsByAccountId();
      }
      catch (error) {
        logger.error("[getting user events]", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getTicketsByAccountId();
    });
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.userTickets)
    };
  },
  components: { UserTickets }
}
</script>

<style scoped>
.title-font {
  font-family: 'Righteous', cursive;
  font-size: 4em;
  color: rgb(240, 192, 0);
  text-shadow: 2px 2px 2px rgb(31, 29, 29);
}
</style>
