import joi from 'joi'

import { PASSWORD_REGEX } from '../common/constants/regex.constants'

export class UserValidator {
  static username = joi.string().min(2).trim()
  static password = joi.string().pattern(PASSWORD_REGEX).trim().messages({
    'string.pattern.base':
      '"password" must be at least 6 characters long and contain at least 1 digit and 1 letter',
  })

  static roleId = joi.string().uuid().trim()

  static create = joi.object({
    username: this.username.required(),
    password: this.password.required(),
    roleId: this.roleId.required(),
  })

  static update = joi.object({
    username: this.username,
    roleId: this.roleId,
  })

  static auth = joi.object({
    username: this.username.required(),
    password: this.password.required(),
  })

  static refresh = joi.object({
    refreshToken: joi.string().required().trim(),
  })

  static queryParams = joi.object({
    username: joi.string().trim(),
    roleIds: joi
      .alternatives()
      .try(joi.array().items(joi.string().trim()), joi.string().trim()),
  })
}
