import { Router } from 'express'

import { authMiddleware, rolesMiddleware } from '../common/middlewares'
import {
  validateBodyMiddleware,
  validateIdMiddleware,
  validateQueryMiddleware,
} from '../common/middlewares'
import { bookController } from '../controllers'
import { BookValidator } from '../validators'

const router = Router()

router.get(
  '/',
  validateQueryMiddleware(BookValidator.queryParams),
  bookController.getAll,
)
router.post(
  '/',
  authMiddleware,
  rolesMiddleware(['admin']),
  validateBodyMiddleware(BookValidator.create),
  bookController.create,
)

router.get('/:id', validateIdMiddleware(), bookController.getById)
router.patch(
  '/:id',
  authMiddleware,
  rolesMiddleware(['admin']),
  validateIdMiddleware(),
  validateBodyMiddleware(BookValidator.update),
  bookController.update,
)
router.delete(
  '/:id',
  authMiddleware,
  rolesMiddleware(['admin']),
  validateIdMiddleware(),
  bookController.delete,
)

export const bookRouter = router
