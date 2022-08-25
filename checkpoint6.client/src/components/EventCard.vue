<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
    <div :class="{ disabled: event.isCanceled }" :title="'Event Cancelled'">
      <div class="card my-2 selectable">
        <img class="card-img-top" :src="event.coverImg" alt="" title="">
        <div class="card-body">
          <h4 class="card-title">{{ event.name }}</h4>
          <p>{{ event.type }}</p>
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
</style>