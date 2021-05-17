import { User } from '@/domain/models'
import { RoleAuthentication } from '@/domain/usecases'
import { Decrypter, LoadUserByIdRepository } from '@/data/protocols'

export class DbRoleAuthentication implements RoleAuthentication {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) { }

  async auth (accessToken: string, role: string): Promise<User> {
    let userId: string
    try {
      userId = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }
    if (userId) {
      const user = await this.loadUserByIdRepository.loadById(userId)
      if (role === user?.role) {
        return user
      }
    }
    return null
  }
}
