import { User } from '@/domain/models'
import { RoleAuthentication } from '@/domain/usecases'
import { Decrypter, LoadUserByIdRepository } from '@/data/protocols'

export class DbRoleAuthentication implements RoleAuthentication {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) { }

  async auth (accessToken: string, role: string): Promise<User> {
    let decrypt: any
    let userId: string
    try {
      decrypt = await this.decrypter.decrypt(accessToken)
      userId = decrypt.id
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
