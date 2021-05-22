import { UpdateUserAccessTokenRepository } from '@/data/protocols'

export const mockUpdateUserAccessTokenRepositoryStub = (): UpdateUserAccessTokenRepository => {
  class UpdateUserAccessTokenRepositoryStub implements UpdateUserAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return null
    }
  }
  return new UpdateUserAccessTokenRepositoryStub()
}
