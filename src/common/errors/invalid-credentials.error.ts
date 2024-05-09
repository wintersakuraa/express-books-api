import { ApiError } from './api.error'

export class InvalidCredentialsError extends ApiError {
  constructor() {
    super('Invalid credentials', 401)
  }
}
