import { NextFunction, Request, Response } from 'express'

export const transformResponseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const originalJson = res.json

  res.json = function (body) {
    originalJson.call(this, { data: body })
    return res
  }

  next()
}

