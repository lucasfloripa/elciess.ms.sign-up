import { DbLoadUsers } from '@/data/usecases'
import { LoadUsersRepository } from '@/data/protocols'
import { mockListUserModel } from '@/tests/domain/mocks'

const mockLoadUsersRepositoryStub = (): LoadUsersRepository => {
  class LoadUsersRepositoryStub implements LoadUsersRepository {
    async loadAll (): Promise<LoadUsersRepository.Result> {
      return mockListUserModel()
    }
  }
  return new LoadUsersRepositoryStub()
}

type SutTypes = {
  sut: DbLoadUsers
  loadUsersRepositoryStub: LoadUsersRepository
}

const makeSut = (): SutTypes => {
  const loadUsersRepositoryStub = mockLoadUsersRepositoryStub()
  const sut = new DbLoadUsers(loadUsersRepositoryStub)
  return { sut, loadUsersRepositoryStub }
}

describe('DbLoadUsers', () => {
  test('Should call loadUsersRepository correctly', async () => {
    const { sut, loadUsersRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadUsersRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
