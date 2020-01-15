
import { Response } from 'express'
import CustomRequest from './InterfaceRequest'

export default interface InterfaceBaseController {
  req: CustomRequest;
  res: Response;
  next: Function;
}
