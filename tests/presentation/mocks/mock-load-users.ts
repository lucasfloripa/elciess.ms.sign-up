import { User } from '@/domain/models'
import { LoadUsers } from '@/domain/usecases'
import { mockListUserModel } from '@/tests/domain/mocks'

export const mockLoadUsersStub = (): LoadUsers => {
  class LoadUsersStub implements LoadUsers {
    async load (): Promise<User[]> {
      return mockListUserModel()
    }
  }
  return new LoadUsersStub()
}
