import { WhereOptions } from 'sequelize'

import { Role } from '../models/role.model'
import { CreateRoleDto, UpdateRoleDto } from '../types/role.types'

class RoleRepository {
  async getAll(): Promise<Role[]> {
    return Role.findAll()
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    return Role.create({ ...dto })
  }

  async getById(id: string): Promise<Role> {
    return Role.findByPk(id)
  }

  async getByParams(params: WhereOptions<Role>): Promise<Role> {
    return Role.findOne({ where: params })
  }

  async update(id: string, dto: UpdateRoleDto): Promise<Role> {
    await Role.update({ ...dto }, { where: { id } })
    return Role.findByPk(id)
  }

  async delete(id: string): Promise<void> {
    await Role.destroy({ where: { id } })
  }
}

export const roleRespository = new RoleRepository()
