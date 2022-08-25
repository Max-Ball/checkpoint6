<template>
  <div>
    <form class="text-center" @submit.prevent="addComment()">
      <textarea class="container-fluid" name="" id="" rows="3" v-model="editable.body"
        placeholder="Add your comment here..."></textarea><br>
      <div class="text-end">
        <div>
          <button class="btn btn-primary my-3">
            Add Comment
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