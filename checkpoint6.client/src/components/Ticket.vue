<template>
  <img class="profile-pic mx-1" :src="ticket.profile.picture" alt="" height="50" width="50"
    :title="ticket.profile.name">
</template>



<script>
export default {
  props: {
    ticket: { type: Object, required: true }
  },
  setup() {

    return {};
  },
};
</script>



<style scoped lang="scss">
.profile-pic {
  border-radius: 50%;
}
</style>