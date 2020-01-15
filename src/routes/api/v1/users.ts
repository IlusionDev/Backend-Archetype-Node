import express from 'express'
import { checkSchema } from 'express-validator'
import userValidaror from '../../validators/userValidator'
import UserController from '../../../controllers/UserController'
const router = express.Router()

router.post('/users', checkSchema(userValidaror), function (req, res, next) {
  const userController = new UserController(req, res, next)
  userController.registerUser()
})

export default router
