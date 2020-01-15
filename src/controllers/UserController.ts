import BaseController from './BaseController'
import { getRepository } from 'typeorm'
import { validationResult } from 'express-validator'
import Bcrypt from 'bcrypt'
import Uuid from 'uuid'
import User from '../entities/User'
import requestTransformer from './transformers/responseTransformer'
import validationTransformer from './transformers/attributesValidationTrasformer'
import userTransformer from './transformers/userTransdormer'

class UserController extends BaseController {
  // eslint-disable-next-line no-useless-constructor
  constructor (req, res, next) {
    super(req, res, next)
  }

  async registerUser () {
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

    if (user) return this.res.status(409).send(
      requestTransformer(true, 'User already exists'))

    const newUser = new User()

    newUser.email = body.email
    newUser.is_active = false
    newUser.password = await Bcrypt.hash(body.password, 4)
    newUser.hash = Uuid()
    let userSaved: User
    
    try {
      userSaved = await userRepository.save(newUser)
      if (!userSaved) return this.res.status(201).json(
        requestTransformer(true, 'User not created', userTransformer(userSaved)))
    } catch (error) {
      this.req.logger.error(error)
    }

    return this.res.status(201).json(
      requestTransformer(false, 'Success', userTransformer(userSaved)))
  }
}

export default UserController
