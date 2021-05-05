import { DbLoadUsers } from '@/data/usecases'
import { LoadUsersRepository } from '@/data/protocols'
import { mockLoadUsersRepositoryStub } from '@/tests/data/mocks'

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
