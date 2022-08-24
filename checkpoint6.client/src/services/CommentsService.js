import { AppState } from "../AppState"
import { api } from "./AxiosService"

class CommentsService {

  async getComments(eventId) {
    const res = await api.get(`/api/events/${eventId}/comments`)
    AppState.comments = res.data
  }

}

export const commentsService = new CommentsService()