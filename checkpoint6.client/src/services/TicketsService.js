import { AppState } from "../AppState"
import { api } from "./AxiosService"

class TicketsService {

  async getTicketHolders(eventId) {
    const res = await api.get(`/api/events/${eventId}/tickets`)
    AppState.ticketHolders = res.data
  }

  async attendEvent(newTicket) {
    if (!newTicket.accountId) {
      const res = await api.post('/api/tickets', newTicket)
      AppState.ticketHolders.push(res.data)
    }
    throw new Error("You're already attending this event")
  }

}

export const ticketsService = new TicketsService()