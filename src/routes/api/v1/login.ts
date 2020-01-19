import express from 'express'
import LoginController from '../../../controllers/LoginController'

const loginRouter = express.Router()

loginRouter.post('/login', (req, res, next) => {
  const loginController = new LoginController(req, res, next)
  loginController.login()
})

export default loginRouter
