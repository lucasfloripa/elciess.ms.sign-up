import { RoleAuthentication } from '@/domain/usecases'
import { User } from '@/domain/models'
import { mockUserModel } from '@/tests/domain/mocks'

export const mockRoleAuthenticationStub = (): RoleAuthentication => {
  class RoleAuthenticationStub implements RoleAuthentication {
    async auth (token: string, role: string): Promise<User> {
      return mockUserModel()
    }
  }
  return new RoleAuthenticationStub()
}
