import { NextFunction, Request, Response } from 'express'

import { userService } from '../services'

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll(req.query)
      res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.create(req.body)
      res.status(201).json(user)
    } catch (e) {
      next(e)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getById(req.params.id)
      res.json(user)
    } catch (e) {
      next(e)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedUser = await userService.update(req.params.id, req.body)
      res.json(updatedUser)
    } catch (e) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.delete(req.params.id)
      res.status(204).send()
    } catch (e) {
      next(e)
    }
  }
}

export const userController = new UserController()
