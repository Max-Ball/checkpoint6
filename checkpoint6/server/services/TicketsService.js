import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { logger } from "../utils/Logger"

class TicketsService {
  async getAccountTickets(accountId) {
    const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return tickets

  }
  async buyTicket(newTicket) {
    // const event = await dbContext.Events.findById(newTicket.eventId)
    // I'm able to manipulate event capacity but not send the manipulated data to the response
    // @ts-ignore
    // logger.log(event.capacity)

    // // @ts-ignore
    // event.capacity -= 1
    const ticket = await dbContext.Tickets.create(newTicket)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    // @ts-ignore
    // logger.log(event.capacity)
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
    return 'This ticket has been refunded to your account'
  }


}

export const ticketsService = new TicketsService()