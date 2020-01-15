import InterfaceBaseController from './interfaces/InterfaceBaseController'
import { Response } from 'express'
import CustomRequest from './interfaces/InterfaceRequest'

class BaseController implements InterfaceBaseController {
    req: CustomRequest
    res: Response
    next: Function;

    constructor (req, res, next) {
      this.req = req
      this.res = res
      this.next = next
    }
}

export default BaseController
