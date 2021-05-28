import { DeleteUserByIdRepository } from '@/data/protocols'

export const mockDeleteUserByIdRepository = (): DeleteUserByIdRepository => {
  class DeleteUserByIdRepositoryStub implements DeleteUserByIdRepository {
    async deleteById (userId: string): Promise<boolean> {
      return true
    }
  }
  return new DeleteUserByIdRepositoryStub()
}
