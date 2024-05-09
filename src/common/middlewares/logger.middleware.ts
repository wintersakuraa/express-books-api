import { logger } from '../../logger'

export const loggerMiddleware = (req, res, next) => {
  const now = Date.now()
  const logMessage = `Start Request [${req.method}]: ${req.url} ${req.hostname}`

  logger.info(logMessage)

  res.on('finish', () => {
    logger.info(`Request Finished: ${Date.now() - now}ms`)
  })

  next()
}
