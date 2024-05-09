import { Router } from 'express'

import { validateBodyMiddleware } from '../common/middlewares'
import { authMiddleware } from '../common/middlewares/auth.middleware'
import { authController } from '../controllers'
import { UserValidator } from '../validators'

const router = Router()

router.post(
  '/login',
  validateBodyMiddleware(UserValidator.auth),
  authController.login,
)

router.post(
  '/register',
  validateBodyMiddleware(UserValidator.auth),
  authController.register,
)

router.get('/logout', authMiddleware, authController.logout)

router.post(
  '/refresh',
  validateBodyMiddleware(UserValidator.refresh),
  authController.refreshTokens,
)

export const authRouter = router
