import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class EventsService {
  async getAllEvents() {
    const events = await dbContext.Events.find().sort({ createdAt: -1 }).populate('creator', 'name, picture')
    return events
  }
  async getEventsById(id) {
    const event = await dbContext.Events.findById(id).populate('creator', 'name, picture')
    if (!event) {
      throw new BadRequest('No event by that ID')
    }
    return event
  }
  async createEvent(newEvent) {
    const event = await dbContext.Events.create(newEvent)
    await event.populate('creator', 'name picture')
    return event
  }

  async editEvent(eventId, userId, eventData) {
    const event = await this.getEventsById(eventId)
    if (event.isCanceled) {
      throw new BadRequest('This event has already been canceled')
    }
    // @ts-ignore
    if (event.creatorId.toString() != userId) {
      throw new Forbidden('This is not your event to edit')
    }


    event.name = eventData.name || event.name
    event.description = eventData.description || event.description
    event.coverImg = eventData.coverImg || event.coverImg
    event.location = eventData.location || event.location
    event.capacity = eventData.capacity || event.capacity
    event.startDate = eventData.startDate || event.startDate
    event.type = eventData.type || event.type

    await event.save()
    return event
  }
  async cancelEvent(eventId, userId) {
    const event = await this.getEventsById(eventId)

    // @ts-ignore
    if (event.creatorId.toString() != userId) {
      throw new Forbidden('You cannot cancel this event')
    }
    event.isCanceled = !event.isCanceled
    await event.save()
    return `event ${event.name} has been cancelled`
  }
}

export const eventsService = new EventsService()