import { User } from '@/domain/models'
import { LoadUserByToken } from '@/domain/usecases'
import { Decrypter, LoadUserByTokenRepository } from '@/data/protocols'

export class DbLoadUserByToken implements LoadUserByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadUserByTokenRepository: LoadUserByTokenRepository
  ) { }

  async loadByToken (accessToken: string, role?: string): Promise<User> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const user = await this.loadUserByTokenRepository.loadByToken(token)
      if (user) {
        return null
      }
    }
    return null
  }
}
