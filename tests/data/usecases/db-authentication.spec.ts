import { DbAuthentication } from '@/data/usecases'
import { LoadUserByEmailRepository, HashComparer, Encrypter } from '@/data/protocols'
import { mockLoadUserByEmailRepositoryStub, mockHashComparerStub } from '@/tests/data/mocks'
import { Authenticate } from '@/domain/usecases'

const mockEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return 'any_token'
    }
  }
  return new EncrypterStub()
}

const mockRequest = (): Authenticate.Params => ({
  email: 'any_email',
  password: 'any_password'
})

type SutTypes = {
  sut: DbAuthentication
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepositoryStub()
  const hashComparerStub = mockHashComparerStub()
  const encrypterStub = mockEncrypterStub()
  const sut = new DbAuthentication(loadUserByEmailRepositoryStub, hashComparerStub, encrypterStub)
  return { sut, loadUserByEmailRepositoryStub, hashComparerStub, encrypterStub }
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

  test('Should call hashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(hashComparerStub, 'compare')
    const request = mockRequest()
    await sut.auth(request)
    expect(loadByEmailSpy).toHaveBeenCalledWith(request.password, 'hashed_password')
  })

  test('Should return null if hashComparer fails', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(null)
    const accessToken = await sut.auth(mockRequest())
    expect(accessToken).toBeNull()
  })

  test('Should throw if hashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.auth(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call encrypter with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockRequest())
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.auth(mockRequest())
    await expect(promise).rejects.toThrow()
  })
})
