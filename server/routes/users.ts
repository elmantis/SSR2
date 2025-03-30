import { Router } from 'express'
import UsersController from '../controllers/usersController'
import { apiRoutes } from '../utils/routes'

const router = Router()

router
  .route(apiRoutes?.users?.show)
  .get(UsersController.index)
  .post(UsersController.show)

export default router