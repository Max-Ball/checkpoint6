<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: ticket.event.id } }">
    <div :class="{ grayscale: ticket.event.isCanceled }" :title="ticket.event.name">
      <div class=" card card-border my-2">
        <img :src="ticket.event.coverImg" class="card-img" alt="event-image" title="Event Image">
        <div class="card-img-overlay d-flex align-items-end justify-content-start p-0 py-0 m-0 container-fluid">
          <div class="glass-card rounded-bottom">
            <div class="px-3">
              <h2 class="card-title m-0">{{ ticket.event.name }}</h2>
              <div class="card-text m-0 fs-5">{{ new Date(ticket.event.startDate).toLocaleDateString() }}</div>
              <div>
                <div class="d-md-none d-block fs-5">{{ ticket.event.location }}</div>
                <div v-if="ticket.event.capacity > 0" class="text-end fs-5"><span class="text-primary fs-5">{{
                    ticket.event.capacity
                }}</span> tickets left</div>
                <div v-else class="text-end text-danger fs-3">SOLD OUT!</div>
              </div>
            </div>
            <div v-if="ticket.event.isCanceled" class="fs-4 card-text text-center rounded-bottom px-2 py-1 bg-danger">
              Event
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