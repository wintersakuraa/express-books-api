import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { appConfig } from '../../configs'
import { TokenPayload } from '../../types/auth.types'
import { ApiError } from '../errors'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) {
    throw new ApiError('Token not provided', 401)
  }

  try {
    const payload = jwt.verify(token, appConfig.jwtAccessSecret) as TokenPayload
    req.res.locals.payload = payload

    next()
  } catch (e) {
    throw new ApiError('Invalid token', 401)
  }
}
