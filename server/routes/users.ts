import { Router } from 'express'
import * as yup from 'yup'
import UsersController from '../controllers/usersController'
import { apiRoutes } from '../utils/routes'
import validateRequest, { baseSchema } from '../middleware/validateRequest'

const router = Router()

const usersSchema = baseSchema({
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

router
  .route(apiRoutes?.users)
  .get(UsersController.index)
  .post(validateRequest(usersSchema), UsersController.create)

export default router