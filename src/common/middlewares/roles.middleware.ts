import { NextFunction, Request, Response } from 'express'

import { TokenPayload } from '../../types/auth.types'
import { AccessDeniedError } from '../errors'

export const rolesMiddleware =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload: TokenPayload = req.res.locals.payload

      const hasAccess = payload && roles.some((role) => payload.role === role)
      if (!hasAccess) {
        throw new AccessDeniedError()
      }

      next()
    } catch (e) {
      next(e)
    }
  }
