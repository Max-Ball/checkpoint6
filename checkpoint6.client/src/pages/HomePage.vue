<template>
  <div class="row">
    <div class="my-2 title-font">Tower Events</div>
    <div class="col-md-12 cover-img">
      <h1 class="accent-font text-start m-5">
        Get ahead of the scalpers.<br>
        Reserve your seat now with<br>
        real events for real people<br>
      </h1>
    </div>
    <div class="col-md-12">
      <div class="row justify-content-evenly py-3">
        <div class="col-md-2 pt-2 btn m-0 elevation-4 my-2" @click="filterEvent = ''" title="All Events">
          <div class="p-0 m-0 fs-4">All</div>
        </div>
        <div class="col-md-2 pt-2 btn m-0 elevation-4 my-2" @click="filterEvent = 'concert'" title="Concert">
          <div class="p-0 m-0 fs-4">Concert</div>
        </div>
        <div class="col-md-2 btn btn-outline-light pt-2 m-0 elevation-4 my-2" @click="filterEvent = 'convention'"
          title="Convention">
          <div class="p-0 m-0 fs-4">Convention</div>
        </div>
        <div class="col-md-2 btn btn-outline-light pt-2 m-0 elevation-4 my-2" @click="filterEvent = 'sport'"
          title="Sport">
          <div class="p-0 m-0 fs-4">Sport</div>
        </div>
        <div class="col-md-2 btn btn-outline-light pt-2 m-0 elevation-4 my-2" @click="filterEvent = 'digital'"
          title="Digital">
          <div class="p-0 m-0 fs-4">Digital</div>
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
.title-font {
  font-family: 'Righteous', cursive;
  font-size: 4em;
  color: rgb(240, 192, 0);
  text-shadow: 2px 2px 2px rgb(31, 29, 29);
}

.btn {
  background-color: rgb(240, 192, 0) !important;
  color: #171a1f !important;
  border: none !important;
}

.btn:hover {
  scale: 1.1;
  color: #171a1f !important;
}

.cover-img {
  min-height: 500px;
  background-position: center;
  background-size: cover;
  display: grid;
  background-image: url(https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
}
</style>
