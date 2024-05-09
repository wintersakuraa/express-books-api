import { Op } from 'sequelize'

import { AlreadyExistsError, NotFoundError } from '../common/errors'
import { getPageOffset, isObjectEmpty } from '../common/helpers/util.helpers'
import { User } from '../models/user.model'
import { roleRespository, userRespository } from '../repositories'
import { FilterOptions, PaginationResponse } from '../types/common.types'
import { CreateUserDto, UpdateUserDto, UserQuery } from '../types/user.types'
import { hasherService } from './hasher.service'

class UserService {
  async getAll(query: UserQuery): Promise<PaginationResponse<User[]>> {
    const { page, limit, username, roleIds } = query

    const pageOffset = getPageOffset(page, limit)
    const filterOptions: FilterOptions = {}

    if (username) {
      filterOptions.username = { [Op.like]: `%${username}%` }
    }

    if (roleIds) {
      filterOptions.roleId =
        Array.isArray(roleIds) && roleIds.length > 0
          ? { [Op.in]: roleIds }
          : roleIds
    }

    const where = {
      ...(!isObjectEmpty(filterOptions) && { [Op.and]: filterOptions }),
    }

    return userRespository.getAll(limit, pageOffset, where)
  }

  async create(dto: CreateUserDto): Promise<User> {
    const { username, password, roleId } = dto

    await this.validateRole(roleId)

    const user = await userRespository.getByParams({ username })
    if (user) {
      throw new AlreadyExistsError('User')
    }

    const hashedPassword = await hasherService.hash(password)
    return userRespository.create({ ...dto, password: hashedPassword })
  }

  async getById(id: string): Promise<User> {
    const user = await userRespository.getById(id)
    if (!user) {
      throw new NotFoundError('User')
    }

    return user
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    if (dto?.roleId) {
      await this.validateRole(dto.roleId)
    }

    return userRespository.update(id, dto)
  }

  async delete(id: string): Promise<void> {
    return userRespository.delete(id)
  }

  private async validateRole(roleId: string): Promise<void> {
    const role = await roleRespository.getById(roleId)
    if (!role) {
      throw new NotFoundError('Role')
    }
  }
}

export const userService = new UserService()
