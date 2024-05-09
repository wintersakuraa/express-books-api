import joi from 'joi'

export class RoleValidator {
  static roleName = joi.string().min(2).lowercase().trim()

  static create = joi.object({
    name: this.roleName.required(),
  })

  static update = joi.object({
    name: this.roleName,
  })
}
