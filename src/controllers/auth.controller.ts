import { NextFunction, Request, Response } from 'express'

import { authService } from '../services'
import { TokenPayload } from '../types/auth.types'

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await authService.login(req.body)
      res.json(tokens)
    } catch (e) {
      next(e)
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await authService.register(req.body)
      res.json(tokens)
    } catch (e) {
      next(e)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: TokenPayload = req.res.locals.payload
      await authService.logout(payload.userId)
      res.json({ success: true })
    } catch (e) {
      next(e)
    }
  }

  async refreshTokens(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await authService.refreshTokens(req.body.refreshToken)
      res.json(tokens)
    } catch (e) {
      next(e)
    }
  }
}

export const authController = new AuthController()
