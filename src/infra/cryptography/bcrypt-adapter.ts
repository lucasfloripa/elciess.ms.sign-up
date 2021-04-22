import { Hasher } from '@/data/protocols'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor (
    private readonly salt: number
  ) {}

  async hash (plaintext: string): Promise<string> {
    await bcrypt.hash(plaintext, this.salt)
    return Promise.resolve(null)
  }
}
