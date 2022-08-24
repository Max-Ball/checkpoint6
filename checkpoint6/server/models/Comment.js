import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const CommentSchema = new Schema(
  {
    eventId: { type: ObjectId, required: true, ref: 'Event' },
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    isAttending: { type: Boolean, required: true, default: false },
    body: { type: String, required: true, minLength: 3, maxLength: 500 }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})