import { Router } from 'express'
import HomeController from '../controllers/homeController'
import { apiRoutes } from '../utils/routes'

const router = Router()

router
  .route(apiRoutes?.home?.show)
  .get(HomeController.show)

export default router