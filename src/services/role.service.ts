import { AlreadyExistsError, NotFoundError } from '../common/errors'
import { Role } from '../models/role.model'
import { roleRespository } from '../repositories'
import { CreateRoleDto, UpdateRoleDto } from '../types/role.types'

class RoleService {
  async getAll(): Promise<Role[]> {
    return roleRespository.getAll()
  }

  async create(dto: CreateRoleDto): Promise<Role> {
    const role = await roleRespository.getByParams({ name: dto.name })
    if (role) {
      throw new AlreadyExistsError('Role')
    }

    return roleRespository.create(dto)
  }

  async getById(id: string): Promise<Role> {
    const role = await roleRespository.getById(id)
    if (!role) {
      throw new NotFoundError('Role')
    }

    return role
  }

  async update(id: string, dto: UpdateRoleDto): Promise<Role> {
    return roleRespository.update(id, dto)
  }

  async delete(id: string): Promise<void> {
    return roleRespository.delete(id)
  }
}

export const roleService = new RoleService()
