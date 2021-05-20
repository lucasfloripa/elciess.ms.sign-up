import { User } from '@/domain/models'
import { RoleAuthentication } from '@/domain/usecases'
import { Decrypter, LoadUserByIdRepository } from '@/data/protocols'

export class DbRoleAuthentication implements RoleAuthentication {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) { }

  async auth (accessToken: string, role: string): Promise<User> {
    const decrypt = await this.decrypter.decrypt(accessToken) as any
    if (decrypt) {
      const user = await this.loadUserByIdRepository.loadById(decrypt.id)
      if (role === user?.role) {
        return user
      }
    }
    return null
  }
}
