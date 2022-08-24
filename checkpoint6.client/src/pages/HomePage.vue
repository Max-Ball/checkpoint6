<template>
  <div class="row">
    <div>
      <h1 class="my-2">CHECKPOINT 6</h1>
    </div>
    <div class="col-md-12 bg-dark">
      <div class="row justify-content-evenly py-2">
        <div class="col-md-2 btn btn-outline-light" @click="filterEvent = ''">All</div>
        <div class="col-md-2 btn btn-outline-light" @click="filterEvent = 'concert'">Concert</div>
        <div class="col-md-2 btn btn-outline-light" @click="filterEvent = 'convention'">Convention</div>
        <div class="col-md-2 btn btn-outline-light" @click="filterEvent = 'sport'">Sport</div>
        <div class="col-md-2 btn btn-outline-light" @click="filterEvent = 'digital'">Digital</div>
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
</style>
