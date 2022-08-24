import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class CommentsService {
  async createComment(newComment) {
    const comment = await dbContext.Comments.create(newComment)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async getEventComments(query) {
    const comments = await dbContext.Comments.find(query).populate('creator', 'name picture')
    return comments
  }
  async getCommentById(id) {
    const comment = await dbContext.Comments.findById(id).populate('creator', 'name picture')
    if (!comment) {
      throw new BadRequest('No comment by that ID')
    }
    return comment
  }
  async deleteComment(commentId, accountId) {
    const comment = await this.getCommentById(commentId)

    // @ts-ignore
    if (comment.creatorId.toString() != accountId) {
      throw new Forbidden('This is not your comment to delete')
    }
    comment.remove()
    return comment
  }
}

export const commentsService = new CommentsService()