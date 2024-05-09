import { NextFunction, Request, Response } from 'express'

import { roleService } from '../services'

class RoleController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await roleService.getAll()
      res.json(roles)
    } catch (e) {
      next(e)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await roleService.create(req.body)
      res.status(201).json(role)
    } catch (e) {
      next(e)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const role = await roleService.getById(req.params.id)
      res.json(role)
    } catch (e) {
      next(e)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedRole = await roleService.update(req.params.id, req.body)
      res.json(updatedRole)
    } catch (e) {
      next(e)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await roleService.delete(req.params.id)
      res.status(204).send()
    } catch (e) {
      next(e)
    }
  }
}

export const roleController = new RoleController()
