<template>
  <div class="row">
    <div class="col-md-12 d-flex align-items-center my-2">
      <img class="profile-pic me-3" :src="comment.creator.picture" alt="" height="70" width="70"
        :title="comment.creator.name">
      <div class="bg-light text-dark rounded p-2 container-fluid">
        <h5>{{ comment.creator.name }}</h5>
        {{ comment.body }}
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    comment: { type: Object, required: true }
  },
  setup() {

    return {};
  },
};
</script>



<style>
.profile-pic {
  border-radius: 50%;
}

.comment-card {
  min-height: 3em;
}
</style>