import { AppState } from "../AppState"
import { api } from "./AxiosService"

class TicketsService {

  async getTicketHolders(eventId) {
    const res = await api.get(`/api/events/${eventId}/tickets`)
    AppState.ticketHolders = res.data
  }

  async attendEvent(newTicket) {
    const res = await api.post('/api/tickets', newTicket)
    AppState.ticketHolders.push(res.data)
  }

  async getTicketsByAccountId() {
    const res = await api.get('account/tickets')
    AppState.userTickets = res.data
  }

  async refundTicket(ticketId) {
    const res = await api.delete(`/api/tickets/${ticketId}`)
    AppState.ticketHolders = AppState.ticketHolders.filter(t => t.id != ticketId)

  }

}

export const ticketsService = new TicketsService()