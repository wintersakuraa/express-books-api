import bcrypt from 'bcrypt'

import { appConfig } from '../configs'

class HasherService {
  async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, appConfig.secretSalt)
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    return bcrypt.compare(payload, hash)
  }
}

export const hasherService = new HasherService()
