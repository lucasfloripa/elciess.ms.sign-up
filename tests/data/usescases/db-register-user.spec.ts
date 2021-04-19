import { RegisterUser } from '@/domain/usecases'
import { RegisterUserRepository, LoadUserByEmailRepository, Hasher } from '@/data/protocols'
import { DbRegisterUser } from '@/data/usecases'
import { mockRegisterUserRepositoryStub, mockLoadUserByEmailRepositoryStub, mockHasherStub,mockLoadUserByEmailResult } from '@/tests/data/mocks'

const mockRequest = (): RegisterUser.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: DbRegisterUser
  registerUserRepositoryStub: RegisterUserRepository
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const registerUserRepositoryStub = mockRegisterUserRepositoryStub()
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepositoryStub()
  const hasherStub = mockHasherStub()
  const sut = new DbRegisterUser(registerUserRepositoryStub, loadUserByEmailRepositoryStub, hasherStub)
  jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementation(async () => await Promise.resolve(null))
  return { sut, registerUserRepositoryStub, loadUserByEmailRepositoryStub, hasherStub }
}

describe('DbRegisterUser', () => {
  test('Should call registerUserRepository with correct values', async () => {
    const { sut, registerUserRepositoryStub } = makeSut()
    const registerSpy = jest.spyOn(registerUserRepositoryStub, 'register')
    await sut.register(mockRequest())
    expect(registerSpy).toBeCalledWith({
      email: mockRequest().email,
      password: 'hashed_password'
    })
  })

  test('Should return false if registerUserRepository returns false', async () => {
    const { sut, registerUserRepositoryStub } = makeSut()
    jest.spyOn(registerUserRepositoryStub, 'register').mockReturnValueOnce(Promise.resolve(false))
    const user = await sut.register(mockRequest())
    expect(user).toBe(false)
  })

  test('Should throw if registerUserRepository throws', async () => {
    const { sut, registerUserRepositoryStub } = makeSut()
    jest.spyOn(registerUserRepositoryStub, 'register').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.register(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call loadUserByEmailRepository with correct value', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.register(mockRequest())
    expect(loadByEmailSpy).toBeCalledWith(mockRequest().email)
  })

  test('Should return false if loadUserByEmailRepository success', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(async () => await Promise.resolve(mockLoadUserByEmailResult()))
    const user = await sut.register(mockRequest())
    expect(user).toBe(false)
  })

  test('Should throw if loadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.register(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(hasherStub, 'hash')
    await sut.register(mockRequest())
    expect(loadByEmailSpy).toBeCalledWith(mockRequest().password)
  })

  test('Should throw if hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.register(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const user = await sut.register(mockRequest())
    expect(user).toBe(true)
  })
})
