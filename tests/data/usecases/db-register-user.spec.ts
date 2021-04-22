import { RegisterUser } from '@/domain/usecases'
import { RegisterUserRepository, CheckUserByEmailRepository, Hasher } from '@/data/protocols'
import { DbRegisterUser } from '@/data/usecases'
import { mockRegisterUserRepositoryStub, mockCheckUserByEmailRepositoryStub, mockHasherStub } from '@/tests/data/mocks'

const mockRequest = (): RegisterUser.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: DbRegisterUser
  registerUserRepositoryStub: RegisterUserRepository
  checkUserByEmailRepositoryStub: CheckUserByEmailRepository
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const registerUserRepositoryStub = mockRegisterUserRepositoryStub()
  const checkUserByEmailRepositoryStub = mockCheckUserByEmailRepositoryStub()
  const hasherStub = mockHasherStub()
  const sut = new DbRegisterUser(registerUserRepositoryStub, checkUserByEmailRepositoryStub, hasherStub)
  jest.spyOn(checkUserByEmailRepositoryStub, 'checkByEmail').mockImplementation(async () => await Promise.resolve(null))
  return { sut, registerUserRepositoryStub, checkUserByEmailRepositoryStub, hasherStub }
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
    const { sut, checkUserByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(checkUserByEmailRepositoryStub, 'checkByEmail')
    await sut.register(mockRequest())
    expect(loadByEmailSpy).toBeCalledWith(mockRequest().email)
  })

  test('Should return false if loadUserByEmailRepository success', async () => {
    const { sut, checkUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(checkUserByEmailRepositoryStub, 'checkByEmail').mockImplementationOnce(async () => await Promise.resolve(true))
    const user = await sut.register(mockRequest())
    expect(user).toBe(false)
  })

  test('Should throw if loadUserByEmailRepository throws', async () => {
    const { sut, checkUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(checkUserByEmailRepositoryStub, 'checkByEmail').mockImplementationOnce(async () => await Promise.reject(new Error()))
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
