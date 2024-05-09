import { NextFunction, Request, Response } from 'express'

import { logger } from '../../logger'

export const errorHandlerMiddleware = (
  error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = error.status || error.statusCode || 500
  const message = error.message || 'Something went wrong'

  logger.error(error)

  res.status(status).json({
    success: false,
    status,
    message: status < 500 ? message : 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? error.stack : {},
  })
}
