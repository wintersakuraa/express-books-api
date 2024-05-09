import { Includeable, WhereOptions } from 'sequelize'

import { User } from '../models/user.model'
import { PaginationResponse } from '../types/common.types'
import { CreateUserDto, UpdateUserDto } from '../types/user.types'

class UserRepository {
  async getAll(
    limit: number,
    pageOffset: number,
    where: WhereOptions<User>,
  ): Promise<PaginationResponse<User[]>> {
    const { count, rows } = await User.findAndCountAll({
      limit,
      offset: pageOffset,
      where,
    })

    return {
      total: count,
      results: rows,
    }
  }

  async create(dto: CreateUserDto): Promise<User> {
    return User.create({ ...dto })
  }

  async getById(id: string): Promise<User> {
    return User.findByPk(id, { include: ['role'] })
  }

  async getByParams(
    params: WhereOptions<User>,
    include: Includeable | Includeable[] = [],
  ): Promise<User> {
    return User.findOne({ where: params, include })
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await User.update({ ...dto }, { where: { id } })
    return User.findByPk(id)
  }

  async delete(id: string): Promise<void> {
    await User.destroy({ where: { id } })
  }
}

export const userRespository = new UserRepository()
