<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: ticket.event.id } }">
    <div class="card my-2 selectable">
      <img class="card-img-top" :src="ticket.event.coverImg" alt="" title="">
      <div class="card-body">
        <h4 class="card-title">{{ ticket.event.name }}</h4>
        <p>{{ ticket.event.type }}</p>
      </div>
    </div>
  </router-link>
</template>



<script>



export default {
  props: {
    ticket: { type: Object, required: true }
  },
  setup() {

    return {
    };
  },
};
</script>



<style>
</style>