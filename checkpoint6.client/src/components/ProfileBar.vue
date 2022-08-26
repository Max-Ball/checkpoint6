<template>
  <router-link :to="{ name: 'Home' }">
    <h5 class="text-light my-4 accent-font" title="Home Page">
      Home
    </h5>
  </router-link>
  <router-link :to="{ name: 'Account' }">
    <h5 class="text-light my-4 accent-font" title="Account Page">
      Account
    </h5>
  </router-link>
  <button class="btn elevation-4" title="Add Event" data-bs-toggle="modal" data-bs-target="#event-modal">
    <i class="mdi mdi-plus fs-3"></i>
  </button>
  <EventForm />
</template>



<script>


export default {

  setup() {

    return {

    };
  },
};
</script>



<style lang="scss" scoped>
</style>