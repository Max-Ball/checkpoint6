<template>
  <router-link :to="{ name: 'Home' }">
    <h5 class="text-light my-4">
      Home
    </h5>
  </router-link>
  <router-link :to="{ name: 'Account' }">
    <h5 class="text-light my-4">
      Account
    </h5>
  </router-link>
  <button class="btn btn-info">
    <i class="mdi mdi-plus"></i>Event
  </button>
</template>



<script>
export default {

  setup() {

    return {};
  },
};
</script>



<style>
</style>