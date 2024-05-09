import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'

import { BadRequestError } from '../errors'
import { isValidUUID } from '../helpers/validation.helpers'

const validateBodyMiddleware =
  (validator: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validator.validate(req.body)
      if (error) {
        throw new BadRequestError(error.message)
      }

      req.body = value
      next()
    } catch (e) {
      next(e)
    }
  }

const validateIdMiddleware =
  (field = 'id') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!isValidUUID(req.params[field])) {
        throw new BadRequestError('Invalid id')
      }

      next()
    } catch (e) {
      next(e)
    }
  }

const validateQueryMiddleware =
  (validator: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = validator.validate(req.query)
      if (error) {
        throw new BadRequestError(error.message)
      }

      req.query = value
      next()
    } catch (e) {
      next(e)
    }
  }

export { validateBodyMiddleware, validateIdMiddleware, validateQueryMiddleware }
