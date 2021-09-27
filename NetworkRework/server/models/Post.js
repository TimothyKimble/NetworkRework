import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const PostSchema = new Schema({
  body: { type: String, required: true },
  imgUrl: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  likeIds: [{ type: Schema.Types.ObjectId, ref: 'Account' }]

},
{ timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
