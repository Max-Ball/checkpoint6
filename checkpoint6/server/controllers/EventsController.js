import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:id', this.getEventsById)
      .get('/:id/tickets', this.getTicketsByEventId)
      .get('/:id/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:id', this.editEvent)
      .delete('/:id', this.cancelEvent)
  }

  async getEventComments(req, res, next) {
    try {
      const comments = await commentsService.getEventComments({ eventId: req.params.id })
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getAllEvents(req, res, next) {
    try {
      const events = await eventsService.getAllEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventsById(req, res, next) {
    try {
      const event = await eventsService.getEventsById(req.params.id)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(req.body)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async editEvent(req, res, next) {
    try {
      let eventData = req.body
      const event = await eventsService.editEvent(req.params.id, req.userInfo.id, eventData)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const message = await eventsService.cancelEvent(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByEventId(req, res, next) {
    try {
      const tickets = await ticketsService.getTicketsByEventId(req.params.id)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
}