<template>
  <div class="row">
    <div class="col-md-12 d-flex align-items-center my-2">
      <img class="profile-pic me-3" :src="comment.creator.picture" alt="profile-picture" height="70" width="70"
        :title="comment.creator.name">
      <div class="bg-light text-dark rounded p-2 container-fluid">
        <div class="d-flex justify-content-between fs-4">{{ comment.creator.name }} <i
            v-if="comment.creatorId == account.id" class="mdi mdi-delete selectable" title="Delete Comment"
            @click="deleteComment()"></i></div>
        <div class="fs-5">{{ comment.body }}</div>
      </div>
    </div>
  </div>
</template>



<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {

    return {
      account: computed(() => AppState.account),

      async deleteComment() {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete this comment?')
          if (!yes) {
            return
          }
          await commentsService.deleteComment(props.comment.id)
        } catch (error) {
          logger.error('[deleting comment]', error)
          Pop.error(error)
        }
      }
    };
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