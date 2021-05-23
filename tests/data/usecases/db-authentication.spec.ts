import { DbAuthentication } from '@/data/usecases'
import { LoadUserByEmailRepository, HashComparer, Encrypter, UpdateUserAccessTokenRepository } from '@/data/protocols'
import { Authenticate } from '@/domain/usecases'
import { mockLoadUserByEmailRepositoryStub, mockHashComparerStub, mockEncrypterStub, mockUpdateUserAccessTokenRepositoryStub } from '@/tests/data/mocks'

const mockRequest = (): Authenticate.Params => ({
  email: 'any_email',
  password: 'any_password'
})

type SutTypes = {
  sut: DbAuthentication
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateUserAccessTokenRepositoryStub: UpdateUserAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepositoryStub()
  const hashComparerStub = mockHashComparerStub()
  const encrypterStub = mockEncrypterStub()
  const updateUserAccessTokenRepositoryStub = mockUpdateUserAccessTokenRepositoryStub()
  const sut = new DbAuthentication(loadUserByEmailRepositoryStub, hashComparerStub, encrypterStub, updateUserAccessTokenRepositoryStub)
  return { sut, loadUserByEmailRepositoryStub, hashComparerStub, encrypterStub, updateUserAccessTokenRepositoryStub }
}

describe('DbAuthentication Data Usecase', () => {
  test('Should call loadUserByEmailRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockRequest())
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email')
  })

  test('Should return null if loadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const user = await sut.auth(mockRequest())
    expect(user).toBeNull()
  })

  test('Should throw if loadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.auth(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call hashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    const request = mockRequest()
    await sut.auth(request)
    expect(compareSpy).toHaveBeenCalledWith(request.password, 'hashed_password')
  })

  test('Should return null if hashComparer fails', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(null))
    const isValid = await sut.auth(mockRequest())
    expect(isValid).toBeNull()
  })

  test('Should throw if hashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.auth(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call encrypter with correct value', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockRequest())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.auth(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call updateUserAccessTokenRepository with correct values', async () => {
    const { sut, updateUserAccessTokenRepositoryStub } = makeSut()
    const updateAccessTokenSpy = jest.spyOn(updateUserAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockRequest())
    expect(updateAccessTokenSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if updateUserAccessTokenRepository throws', async () => {
    const { sut, updateUserAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateUserAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.auth(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an accessToken on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockRequest())
    expect(accessToken).toBe('any_token')
  })
})
