<template>
  <div class="modal fade" id="event-modal" tabindex="-1" aria-labelledby="event-modal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Create An Event</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-start">
          <form @submit.prevent="createEvent()">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-6 my-2">
                  <label for="name">Event Name:</label>
                  <input class="form-control" type="text" name="name" v-model="editable.name" required>
                </div>
                <div class="col-md-6 my-2">
                  <label for="location">Event Location:</label>
                  <input class="form-control" type="text" name="location" v-model="editable.location" required>
                </div>
                <div class="col-md-12 my-2">
                  <label for="description">Event Description:</label>
                  <textarea class="container-fluid form-control" type="text" name="description" cols="30" rows="5"
                    v-model="editable.description" required></textarea>
                </div>
                <div class="col-md-12 my-2">
                  <label for="img">Event Image:</label>
                  <input class="form-control" type="text" name="img" v-model="editable.coverImg" required>
                </div>
                <div class="col-md-4 my-2">
                  <label for="capacity">Event Capacity:</label>
                  <input class="form-control" type="number" name="capacity" v-model="editable.capacity" required>
                </div>
                <div class="col-md-4 my-2">
                  <label for="startDate">Event Date:</label>
                  <input class="form-control selectable" type="date" name="startDate" v-model="editable.startDate"
                    required>
                </div>
                <div class="col-md-4 my-2">
                  <label for="" class="form-label m-0">Event Type:</label>
                  <select name="type" class="form-control selectable m-0" v-model="editable.type" required>
                    <option value=""></option>
                    <option value="concert">Concert</option>
                    <option value="convention">Convention</option>
                    <option value="sport">Sport</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary col-md-10 offset-md-1 mt-5 mb-2"
                  data-bs-dismiss="modal">Create Event</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { router } from '../router';
import { eventsService } from '../services/EventsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {

  setup() {
    const editable = ref({})


    return {
      editable,

      async createEvent() {
        try {
          const event = await eventsService.createEvent(editable.value)
          Pop.toast('Event Created!')
          router.push({ name: 'EventDetails', params: { eventId: event.id } })
        } catch (error) {
          logger.error('[creating event]', error)
          Pop.error(error)
        }
      }
    };
  },
};
</script>



<style>
</style>