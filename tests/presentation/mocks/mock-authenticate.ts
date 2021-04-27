import { Authenticate } from '@/domain/usecases'

export const mockAuthenticateStub = (): Authenticate => {
  class AuthenticateStub implements Authenticate {
    async auth (credentials: Authenticate.Params): Promise<string> {
      return await Promise.resolve('access_token')
    }
  }
  return new AuthenticateStub()
}
