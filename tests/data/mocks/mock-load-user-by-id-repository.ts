import { LoadUserByIdRepository } from '@/data/protocols'
import { mockUserModel } from '@/tests/domain/mocks'

export const mockLoadUserByIdRepository = (): LoadUserByIdRepository => {
  class LoadUserByIdRepositoryStub implements LoadUserByIdRepository {
    async loadById (id: string): Promise<LoadUserByIdRepository.Result> {
      return mockUserModel()
    }
  }
  return new LoadUserByIdRepositoryStub()
}
