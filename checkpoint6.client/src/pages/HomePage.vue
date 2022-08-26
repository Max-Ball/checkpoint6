<template>
  <div class="row">
    <h1 class="my-2 title-font">Tower Events</h1>
    <div class="col-md-12 category-bar">
      <div class="row justify-content-evenly py-3">
        <div class="col-md-2 pt-2 btn btn-outline-light m-0 elevation-4" @click="filterEvent = ''" title="All Events">
          <h5 class="p-0 m-0">All</h5>
        </div>
        <div class="col-md-2 pt-2 btn btn-outline-light m-0 elevation-4" @click="filterEvent = 'concert'"
          title="Concert">
          <h5 class="p-0 m-0">Concert</h5>
        </div>
        <div class="col-md-2 btn btn-outline-light pt-2 m-0 elevation-4" @click="filterEvent = 'convention'"
          title="Convention">
          <h5 class="p-0 m-0">Convention</h5>
        </div>
        <div class="col-md-2 btn btn-outline-light pt-2 m-0 elevation-4" @click="filterEvent = 'sport'" title="Sport">
          <h5 class="p-0 m-0">Sport</h5>
        </div>
        <div class="col-md-2 btn btn-outline-light pt-2 m-0 elevation-4" @click="filterEvent = 'digital'"
          title="Digital">
          <h5 class="p-0 m-0">Digital</h5>
        </div>
      </div>
    </div>
    <div class="col-md-3" v-for="e in events" :key="e.id">
      <EventCard :event="e" />
    </div>
  </div>
</template>

<script>
import { logger } from '../utils/Logger';
import { eventsService } from '../services/eventsService'
import Pop from '../utils/Pop';
import { onMounted } from 'vue';
import { computed, ref } from '@vue/reactivity';
import { AppState } from '../AppState';

export default {
  setup() {
    const filterEvent = ref('')
    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        logger.error('[getting events]', error)
        Pop.error
      }
    }

    onMounted(() => {
      getEvents()
    })
    return {
      filterEvent,
      events: computed(() => AppState.events.filter(e => filterEvent.value ? e.type == filterEvent.value : true))
    }
  }
}
</script>

<style scoped lang="scss">
// .category-bar {
//   background: #fff3b0;
//   background: linear-gradient(90deg, #fff3b0 97%, rgba(50, 59, 79) 100%);
// }

.title-font {
  font-family: 'Righteous', cursive;
  font-size: 4em;
  color: rgb(240, 192, 0);
  text-shadow: 2px 2px 2px rgb(31, 29, 29);
}
</style>
