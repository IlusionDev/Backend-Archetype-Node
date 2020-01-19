import BaseController from './BaseController'
import { getRepository } from 'typeorm'
import { validationResult } from 'express-validator'
import Bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
import User from '../entities/User'
import requestTransformer from './transformers/responseTransformer'
import validationTransformer from './transformers/attributesValidationTrasformer'
import userTransformer from './transformers/userTransdormer'

class LoginController extends BaseController {
  constructor (req, res, next) {
    super(req, res, next)
  }

  async login () {
    const errors = validationResult(this.req)
    if (!errors.isEmpty()) {
      return this.res.status(400).json(
        requestTransformer(true, 'Failed validation',
          validationTransformer(errors.array())
        )
      )
    }
    const { body } = this.req
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({ where: { email: body.email } })
    const isAuthenticated = Bcrypt.compare(body.password, user.password)

    if (!isAuthenticated) return this.res.status(401).end()
    
    const jwtSecret = process.env.JWT_SECRET
    
    Jwt.sign({user : userTransformer(user) }, jwtSecret, {
      algorithm: 'HS256',
      expiresIn: '1h'
    }, (error, token) => {
        if (error) return this.res.status(401).end(requestTransformer(true, 'Authtentication failed'))
      return this.res.status(200).json(
        requestTransformer(false, 'Success', token))
    })
  }
}

export default LoginController
