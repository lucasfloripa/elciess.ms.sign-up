import { DbAuthentication } from '@/data/usecases'
import { LoadUserByEmailRepository } from '@/data/protocols'
import { mockLoadUserByEmailRepositoryStub } from '@/tests/data/mocks'

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
