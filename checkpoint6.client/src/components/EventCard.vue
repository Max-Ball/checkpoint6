<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
    <div :class="{ grayscale: event.isCanceled }" :title="event.name">
      <div class=" card card-border my-2">
        <img :src="event.coverImg" class="card-img" alt="event-image" title="Event Image">
        <div class="card-img-overlay d-flex align-items-end justify-content-start p-0 py-0 m-0 container-fluid">
          <div class="glass-card rounded-bottom">
            <div class="px-3">
              <h2 class="card-title m-0">{{ event.name }}</h2>
              <div class="card-text m-0 fs-5">{{ new Date(event.startDate).toLocaleDateString() }}</div>
              <div>
                <div class="d-md-none d-block fs-5">{{ event.location }}</div>
                <div v-if="event.capacity > 0" class="text-end fs-5"><span class="text-primary fs-5">{{ event.capacity
                }}</span> tickets left</div>
                <div v-else class="text-end text-danger fs-3">SOLD OUT!</div>
              </div>
            </div>
            <div v-if="event.isCanceled" class="fs-4 card-text text-center rounded-bottom px-2 py-1 bg-danger">Event
              has
              been
              cancelled
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>



<script>
export default {
  props: {
    event: { type: Object, required: true }
  },

  setup() {

    return {};
  },
};
</script>



<style>
.grayscale {
  filter: grayscale(1);
}


.glass-card {
  background: rgba(76, 66, 66, 0.4);
  backdrop-filter: blur(5px);
  text-shadow: 2px 2px 2px rgb(31, 29, 29);
  color: #f2e9e4 !important;
  width: 100%;
}

.select:hover {
  cursor: pointer;
  transform: scale(1.025, 1.025);
  color: #f2e9e4 !important;
}

.card-border {
  border: 2px solid rgb(240, 192, 0);
}

.card {
  overflow: hidden;
}
</style>