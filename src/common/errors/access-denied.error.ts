import { ApiError } from './api.error'

export class AccessDeniedError extends ApiError {
  constructor() {
    super('Access Denied', 403)
  }
}
