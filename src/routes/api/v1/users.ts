import express from 'express'
import { checkSchema } from 'express-validator'
import UserValidaror from '../../validators/userValidator'
import UserController from '../../../controllers/UserController'
import Passport from '../../../config/passport'

const router = express.Router()


router.post('/users', checkSchema(UserValidaror), function (req, res, next) {
  const userController = new UserController(req, res, next)
  userController.registerUser()
})

export default router
