<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
    <div class="card my-2 selectable">
      <img class="card-img-top" :src="event.coverImg" alt="" title="">
      <div class="card-body">
        <h4 class="card-title">{{ event.name }}</h4>
        <p>{{ event.type }}</p>
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
</style>