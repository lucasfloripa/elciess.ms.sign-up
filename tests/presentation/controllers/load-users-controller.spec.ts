import { LoadUsersController } from '@/presentation/controllers'
import { LoadUsers } from '@/domain/usecases'
import { User } from '@/domain/models'
import { mockUserModel } from '@/tests/domain/mocks'

const mockLoadUsersStub = (): LoadUsers => {
  class LoadUsersStub implements LoadUsers {
    async load (): Promise<User[]> {
      return [
        mockUserModel(),
        mockUserModel()
      ]
    }
  }
  return new LoadUsersStub()
}

type SutTypes = {
  sut: LoadUsersController
  loadUsersStub: LoadUsers
}

const makeSut = (): SutTypes => {
  const loadUsersStub = mockLoadUsersStub()
  const sut = new LoadUsersController(loadUsersStub)
  return { sut, loadUsersStub }
}

describe('LoadUsersController', () => {
  test('Should call loadUsers correctly', async () => {
    const { sut, loadUsersStub } = makeSut()
    const loadUsersSpy = jest.spyOn(loadUsersStub, 'load')
    await sut.handle()
    expect(loadUsersSpy).toHaveBeenCalled()
  })
})
