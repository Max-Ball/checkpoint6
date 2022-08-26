<template>
  <router-link :to="{ name: 'Home' }">
    <h1 class="text-light my-4 accent-font text-scale m-3" title="Home Page">
      Home
    </h1>
  </router-link>
  <router-link :to="{ name: 'Account' }">
    <div class="text-light my-4 accent-font text-scale m-3 fs-3" title="Account Page">
      Account
    </div>
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
.text-scale:hover {
  scale: 1.1;
  border-bottom: 2px solid rgb(240, 192, 0);
}

.btn {
  background-color: rgb(240, 192, 0) !important;
  color: #171a1f !important;
  border: none !important;
}

.btn:hover {
  scale: 1.1;
  background-color: rgb(240, 192, 0);
  color: #171a1f !important;
}
</style>