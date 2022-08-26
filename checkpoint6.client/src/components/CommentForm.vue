<template>
  <div>
    <form class="text-center" @submit.prevent="addComment()">
      <textarea class="container-fluid elevation-4 rounded" name="" id="" rows="3" v-model="editable.body"
        placeholder="Add your comment here..."></textarea><br>
      <div class="text-end">
        <div>
          <button class="btn btn-primary my-3 elevation-4" title="Add Comment">
            <div class="m-0 fs-5">Add Comment</div>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>



<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  setup() {
    const editable = ref({})
    const route = useRoute()

    return {
      editable,

      async addComment() {
        try {
          editable.value.eventId = route.params.eventId
          await commentsService.addComment(editable.value)
          editable.value = {}
        } catch (error) {
          logger.error('[commenting]', error)
          Pop.error(error)
        }
      }
    };
  },
};
</script>



<style>
</style>