import { DbAuthentication } from '@/data/usecases'
import { LoadUserByEmailRepository } from '@/data/protocols'

const mockLoadUserByEmailRepositoryStub = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
      return {
        id: 'any_id',
        email: 'any_email',
        password: 'any_password'
      }
    }
  }
  return new LoadUserByEmailRepositoryStub()
}

type SutTypes = {
  sut: DbAuthentication
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepositoryStub()
  const sut = new DbAuthentication(loadUserByEmailRepositoryStub)
  return { sut, loadUserByEmailRepositoryStub }
}

describe('DbAuthentication', () => {
  test('Should call loadUserByEmailRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.auth({
      email: 'any_email',
      password: 'any_password'
    })
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email')
  })
})
