<template>
  <div class="row">
    <h2 class="bg-card mt-4 p-3">MY EVENTS</h2>
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
.bg-card {
  background: rgb(74, 78, 105);
  background: linear-gradient(90deg, rgba(74, 78, 105, 1) 20%, rgba(50, 59, 79) 70%);
  color: #f2e9e4;
}
</style>
