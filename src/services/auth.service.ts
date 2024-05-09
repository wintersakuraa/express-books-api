import jwt from 'jsonwebtoken'

import { AccessDeniedError, InvalidCredentialsError } from '../common/errors'
import { appConfig } from '../configs'
import { roleRespository, userRespository } from '../repositories'
import { AuthDto, TokenPayload, Tokens } from '../types/auth.types'
import { hasherService } from './hasher.service'
import { userService } from './user.service'

class AuthService {
  async login(dto: AuthDto): Promise<Tokens> {
    const { username, password } = dto

    const user = await userRespository.getByParams({ username }, 'role')
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const hasPasswordMatched = await hasherService.compare(
      password,
      user.password,
    )
    if (!hasPasswordMatched) {
      throw new InvalidCredentialsError()
    }

    const tokens = await this.generateTokens({
      userId: user.id,
      role: user.role.name,
    })
    return tokens
  }

  async register(dto: AuthDto): Promise<Tokens> {
    let userRole = await roleRespository.getByParams({ name: 'user' })

    if (!userRole) {
      userRole = await roleRespository.create({ name: 'user' })
    }

    const user = await userService.create({ ...dto, roleId: userRole.id })

    const tokens = await this.generateTokens({
      userId: user.id,
      role: userRole.name,
    })
    return tokens
  }

  async logout(userId: string) {
    await userRespository.update(userId, { refreshToken: null })
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const payload = jwt.verify(
      refreshToken,
      appConfig.jwtRefreshSecret,
    ) as TokenPayload
    if (!payload) {
      throw new AccessDeniedError()
    }

    const user = await userRespository.getById(payload.userId)
    if (!user || !user.refreshToken) {
      throw new AccessDeniedError()
    }

    const refreshTokenMatches = await hasherService.compare(
      refreshToken,
      user.refreshToken,
    )
    if (!refreshTokenMatches) {
      throw new AccessDeniedError()
    }

    const tokens = await this.generateTokens({
      userId: user.id,
      role: user.role.name,
    })
    return tokens
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hasherService.hash(refreshToken)
    await userRespository.update(userId, {
      refreshToken: hashedRefreshToken,
    })
  }

  private async generateTokens(payload: TokenPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      await jwt.sign(payload, appConfig.jwtAccessSecret, {
        expiresIn: '4m',
      }),
      await jwt.sign(payload, appConfig.jwtRefreshSecret, {
        expiresIn: '30d',
      }),
    ])

    await this.updateRefreshToken(payload.userId, refreshToken)

    return {
      accessToken,
      refreshToken,
    }
  }
}

export const authService = new AuthService()
