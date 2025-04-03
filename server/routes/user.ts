import { Router } from 'express'
import * as yup from 'yup'
import { apiRoutes } from '../utils/routes'
import UserController from '../controllers/userController'
import validateRequest, { baseSchema } from '../middleware/validateRequest'

const router = Router()

const updateUserSchema = baseSchema({
  body: yup.object({
    name: yup
      .string()
      .required(),
    zipCode: yup.number().required(),
    latitude: yup.string().required(),
    longitude: yup.string().required(),
    timeZone: yup.string().required(),
  })
})

const getUserSchema = baseSchema({
  params: yup.object({
    id: yup.string().required()
  })
})
router
  .route(apiRoutes?.user)
  .get(validateRequest(getUserSchema), UserController.show)
  .patch(validateRequest(updateUserSchema), UserController.update)

export default router