<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
    <div :class="{ grayscale: event.isCanceled }" :title="event.name">
      <div class=" card card-border my-2">
        <img :src="event.coverImg" class="card-img" alt="...">
        <div class="card-img-overlay d-flex align-items-end justify-content-start p-0 py-0 m-0 container-fluid">
          <div class="glass-card rounded-bottom">
            <div class="px-3">
              <h4 class="card-title m-0">{{ event.name }}</h4>
              <p class="card-text m-0">{{ new Date(event.startDate).toLocaleDateString() }}</p>
              <div>
                <h6 class="d-md-none d-block">{{ event.location }}</h6>
                <h6 v-if="event.capacity > 0" class="text-end"><span class="text-primary fs-5">{{ event.capacity
                }}</span> tickets left</h6>
                <h4 v-else class="text-end text-danger">SOLD OUT!</h4>
              </div>
            </div>
            <h6 v-if="event.isCanceled" class="card-text text-center rounded-bottom px-2 py-1 bg-danger">Event has been
              cancelled
            </h6>
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

.bg-card {
  background-color: #4a4e69 !important;
  color: #f2e9e4 !important;
}

.glass-card {
  background: rgba(76, 66, 66, 0.4);
  backdrop-filter: blur(3px);
  text-shadow: 1px 1px 2px rgb(31, 29, 29);
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