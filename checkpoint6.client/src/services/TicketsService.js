import { AppState } from "../AppState"
import { api } from "./AxiosService"

class TicketsService {

  async getTicketHolders(eventId) {
    const res = await api.get(`/api/events/${eventId}/tickets`)
    AppState.ticketHolders = res.data
  }
}

export const ticketsService = new TicketsService()