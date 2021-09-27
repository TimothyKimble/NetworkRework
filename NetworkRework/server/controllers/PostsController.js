import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'
export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getOne)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const posts = await postsService.getAll(req.query)
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const post = await postsService.getOne(req.params.id)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const post = await postsService.create(req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const post = await postsService.edit(req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await postsService.destroy(req.params.id, req.userInfo.id)
      res.send({ message: 'Destroyed Post' })
    } catch (error) {
      next(error)
    }
  }
}
