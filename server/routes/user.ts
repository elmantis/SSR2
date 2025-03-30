import { Router } from 'express'
import { apiRoutes } from '../utils/routes'
import UserController from '../controllers/userController'

const router = Router()

router
  .route(apiRoutes?.user?.show)
  .get(UserController.show)
  .patch(UserController.update)

export default router