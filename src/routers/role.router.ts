import { Router } from 'express'

import {
  validateBodyMiddleware,
  validateIdMiddleware,
} from '../common/middlewares'
import { roleController } from '../controllers'
import { RoleValidator } from '../validators'

const router = Router()

router.get('/', roleController.getAll)
router.post(
  '/',
  validateBodyMiddleware(RoleValidator.create),
  roleController.create,
)

router.get('/:id', validateIdMiddleware(), roleController.getById)
router.patch(
  '/:id',
  validateIdMiddleware(),
  validateBodyMiddleware(RoleValidator.update),
  roleController.update,
)
router.delete('/:id', validateIdMiddleware(), roleController.delete)

export const roleRouter = router
