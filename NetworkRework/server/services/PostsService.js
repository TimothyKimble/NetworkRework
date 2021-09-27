import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async getAll(query = {}) {
    const posts = await dbContext.Posts.find(query).populate('creator')
    return posts
  }

  async getOne(id, userId) {
    const post = await dbContext.Posts.findById(id, userId).populate('creator')
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    return post
  }

  async create(body) {
    const post = await dbContext.Posts.create(body)
    return await dbContext.Posts.findById(post._id).populate('creator', 'name picture')
  }

  async edit(body) {
    const post = await dbContext.Posts.findByIdAndUpdate(body.id, body, { new: true, runValidators: true })
    if (!post) {
      throw new BadRequest('invalid Id')
    }
    return post
  }

  async destroy(id, userId) {
    const foundPost = await this.getOne(id, userId)
    if (foundPost.creatorId === userId) {
      const post = await dbContext.Posts.findByIdAndDelete(id)
      if (!post) {
        throw new BadRequest('invalid Id')
      } return post
    }
  }
}

export const postsService = new PostsService()
