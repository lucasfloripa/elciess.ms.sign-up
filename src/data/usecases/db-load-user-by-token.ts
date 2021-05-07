import { User } from '@/domain/models'
import { LoadUserByToken } from '@/domain/usecases'
import { Decrypter } from '@/data/protocols'

export class DbLoadUserByToken implements LoadUserByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) { }

  async loadByToken (accessToken: string, role?: string): Promise<User> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
