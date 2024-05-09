interface CreateRoleDto {
  name: string
}

type UpdateRoleDto = Partial<CreateRoleDto>

export { CreateRoleDto, UpdateRoleDto }
