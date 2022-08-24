import { AppState } from "../AppState"
import { api } from "./AxiosService"

class CommentsService {

  async getComments(eventId) {
    const res = await api.get(`/api/events/${eventId}/comments`)
    AppState.comments = res.data
  }

  async addComment(newComment) {
    const res = await api.post('/api/comments', newComment)
    AppState.comments.push(res.data)
  }

}

export const commentsService = new CommentsService()