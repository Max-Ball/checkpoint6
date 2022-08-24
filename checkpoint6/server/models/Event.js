import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId


export const EventSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 2, maxLength: 30 },
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    description: { type: String, required: true, minLength: 2, maxLength: 2000 },
    coverImg: { type: String, required: true, maxLength: 500 },
    location: { type: String, required: true, minLength: 2, maxLength: 50 },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, required: true, enum: ['convention', 'concert', 'sport', 'digital'] }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

EventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})