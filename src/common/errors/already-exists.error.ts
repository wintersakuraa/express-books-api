import { ApiError } from './api.error'

export class AlreadyExistsError extends ApiError {
  constructor(entity: string) {
    super(`${entity} already exists`, 409)
  }
}
