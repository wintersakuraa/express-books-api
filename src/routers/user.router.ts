import { Router } from 'express'

import {
  validateBodyMiddleware,
  validateIdMiddleware,
  validateQueryMiddleware,
} from '../common/middlewares'
import { userController } from '../controllers'
import { UserValidator } from '../validators'

const router = Router()

router.get(
  '/',
  validateQueryMiddleware(UserValidator.queryParams),
  userController.getAll,
)
router.post(
  '/',
  validateBodyMiddleware(UserValidator.create),
  userController.create,
)

router.get('/:id', validateIdMiddleware(), userController.getById)
router.patch(
  '/:id',
  validateIdMiddleware(),
  validateBodyMiddleware(UserValidator.update),
  userController.update,
)
router.delete('/:id', validateIdMiddleware(), userController.delete)

export const userRouter = router
