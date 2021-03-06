import { DeleteUserByIdRepository } from '@/data/protocols'
import { DeleteUser } from '@/domain/usecases'

export class DbDeleteUser implements DeleteUser {
  constructor (
    private readonly deleteUserByIdRepository: DeleteUserByIdRepository
  ) { }

  async delete (id: string): Promise<boolean> {
    return await this.deleteUserByIdRepository.deleteById(id)
  }
}
