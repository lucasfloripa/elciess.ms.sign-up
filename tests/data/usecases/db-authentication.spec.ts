import { DbAuthentication } from '@/data/usecases'
import { LoadUserByEmailRepository } from '@/data/protocols'
import { mockLoadUserByEmailRepositoryStub } from '@/tests/data/mocks'
import { Authenticate } from '@/domain/usecases'

const mockRequest = (): Authenticate.Params => ({
  email: 'any_email',
  password: 'any_password'
})

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
    await sut.auth(mockRequest())
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should return null if loadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const accessToken = await sut.auth(mockRequest())
    expect(accessToken).toBeNull()
  })

  test('Should throw if loadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.auth(mockRequest())
    await expect(promise).rejects.toThrow()
  })
})
