import { mockListUserModel } from '@/tests/domain/mocks'
import { LoadUsersRepository } from '@/data/protocols'

export const mockLoadUsersRepositoryStub = (): LoadUsersRepository => {
  class LoadUsersRepositoryStub implements LoadUsersRepository {
    async loadAll (): Promise<LoadUsersRepository.Result> {
      return mockListUserModel()
    }
  }
  return new LoadUsersRepositoryStub()
}
