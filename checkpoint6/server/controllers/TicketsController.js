import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";


export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.buyTicket)
      .delete('/:id', this.refundTicket)
  }

  async buyTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const ticket = await ticketsService.buyTicket(req.body)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

  async refundTicket(req, res, next) {
    try {
      const message = await ticketsService.refundTicket(req.params.id, req.userInfo.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }


}