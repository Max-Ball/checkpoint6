import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TicketsService {
  async getAccountTickets(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return tickets

  }
  async buyTicket(newTicket) {
    const event = await dbContext.Events.findById(newTicket.eventId)
    // @ts-ignore
    event.capacity -= 1
    // @ts-ignore
    await event.save()

    // @ts-ignore
    if (event.capacity <= 0) {
      throw new BadRequest('There are no more tickets available for this event')
    }


    const ticket = await dbContext.Tickets.create(newTicket)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    return ticket
  }
  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
    return tickets
  }

  async refundTicket(ticketId, userId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (!ticket) {
      throw new BadRequest('This ticket does not exist')
    }
    // @ts-ignore
    if (ticket.accountId.toString() != userId) {
      throw new Forbidden('You cannot refund this ticket')
    }
    await ticket.remove()
    const event = await dbContext.Events.findById(ticket.eventId)
    // @ts-ignore
    event.capacity += 1
    // @ts-ignore
    await event.save()
    return 'This ticket has been refunded to your account'

  }


}

export const ticketsService = new TicketsService()