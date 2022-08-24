import { AppState } from "../AppState"
import { api } from "./AxiosService"

class EventsService {

  async getEvents() {
    const res = await api.get('/api/events')
    AppState.events = res.data
  }

  async getEventById(eventId) {
    const res = await api.get(`/api/events/${eventId}`)
    AppState.activeEvent = res.data
  }
}

export const eventsService = new EventsService()