import { PaginationQuery } from './common.types'

interface CreateUserDto {
  username: string
  password: string
  roleId: string
}

interface UpdateUserDto {
  username?: string
  roleId?: string
  refreshToken?: string
}

interface UserQuery extends PaginationQuery {
  username?: string
  roleIds?: string | string[]
}

export { CreateUserDto, UpdateUserDto, UserQuery }
