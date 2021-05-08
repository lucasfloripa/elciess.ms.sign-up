import { Decrypter, Encrypter } from '@/data/protocols'
import env from '@/main/config/env'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  async encrypt (id: string): Promise<string> {
    return jwt.sign({ id }, env.jwtSecret)
  }

  async decrypt (text: string): Promise<string> {
    return jwt.verify(text, env.jwtSecret) as any
  }
}
