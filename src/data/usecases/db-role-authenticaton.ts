import { User } from '@/domain/models'
import { RoleAuthentication } from '@/domain/usecases'
import { Decrypter, LoadUserByTokenRepository } from '@/data/protocols'

export class DbRoleAuthentication implements RoleAuthentication {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadUserByTokenRepository: LoadUserByTokenRepository
  ) { }

  async auth (accessToken: string, role: string): Promise<User> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const user = await this.loadUserByTokenRepository.loadByToken(token)
      if (role === user?.role) {
        return user
      }
    }
    return null
  }
}
