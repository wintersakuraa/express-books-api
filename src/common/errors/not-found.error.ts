import { ApiError } from './api.error'

export class NotFoundError extends ApiError {
  constructor(entity: string) {
    super(`${entity} not found`, 404)
  }
}
