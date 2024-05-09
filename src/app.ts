import 'reflect-metadata'
import 'dotenv/config'

import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import swaggerDocument from '../swagger.json'
import { ApiError } from './common/errors'
import {
  authMiddleware,
  errorHandlerMiddleware,
  loggerMiddleware,
  rolesMiddleware,
  transformResponseMiddleware,
} from './common/middlewares'
import { appConfig } from './configs'
import { logger } from './logger'
import { authRouter, bookRouter, roleRouter, userRouter } from './routers'
import { sequelize } from './sequelize'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(transformResponseMiddleware)
app.use(loggerMiddleware)

app.use('/auth', authRouter)
app.use('/users', authMiddleware, rolesMiddleware(['admin']), userRouter)
app.use('/roles', authMiddleware, rolesMiddleware(['admin']), roleRouter)
app.use('/books', bookRouter)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new ApiError('Method not allowed', 405))
})

app.use(errorHandlerMiddleware)

const start = async (): Promise<void> => {
  try {
    await sequelize.sync()

    app.listen(appConfig.port, () => {
      logger.info(`Server started on port ${appConfig.port}`)
    })
  } catch (e) {
    logger.error(e)
    process.exit(1)
  }
}

start()
