import { Encrypter } from '@/data/protocols'
import env from '@/main/config/env'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  async encrypt (id: string): Promise<string> {
    return jwt.sign(id, env.jwtSecret)
  }
}
