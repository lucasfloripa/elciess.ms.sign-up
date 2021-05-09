import { LoadUserByTokenRepository } from '@/data/protocols'
import { mockUserModel } from '@/tests/domain/mocks'

export const mockLoadUserByTokenRepository = (): LoadUserByTokenRepository => {
  class LoadUserByTokenStub implements LoadUserByTokenRepository {
    async loadByToken (accessToken: string): Promise<LoadUserByTokenRepository.Result> {
      return mockUserModel()
    }
  }
  return new LoadUserByTokenStub()
}
