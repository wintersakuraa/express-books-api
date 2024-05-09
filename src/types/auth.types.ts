import { CreateUserDto } from './user.types'

type AuthDto = Omit<CreateUserDto, 'roleId'>

interface Tokens {
  accessToken: string
  refreshToken: string
}

interface TokenPayload {
  userId: string
  role: string
}

export { AuthDto, TokenPayload, Tokens }
