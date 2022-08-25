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

  async createEvent(newEvent) {
    const res = await api.post('/api/events', newEvent)
    AppState.events.unshift(res.data)
    return res.data
  }

  async deleteEvent(eventId) {
    const res = await api.delete(`/api/events/${eventId}`)
    AppState.events = AppState.events.filter(e => e.id != eventId)
  }
}

export const eventsService = new EventsService()