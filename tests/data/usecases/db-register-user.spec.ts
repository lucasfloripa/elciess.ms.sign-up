import { RegisterUser } from '@/domain/usecases'
import { RegisterUserRepository, CheckUserByEmailRepository, Hasher, IdGenerator } from '@/data/protocols'
import { DbRegisterUser } from '@/data/usecases'
import { mockRegisterUserRepositoryStub, mockCheckUserByEmailRepositoryStub, mockHasherStub, mockRegisterUserRepositoryParams, mockIdGeneratorStub } from '@/tests/data/mocks'

const mockRequest = (): RegisterUser.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: DbRegisterUser
  idGeneratorStub: IdGenerator
  registerUserRepositoryStub: RegisterUserRepository
  checkUserByEmailRepositoryStub: CheckUserByEmailRepository
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const idGeneratorStub = mockIdGeneratorStub()
  const registerUserRepositoryStub = mockRegisterUserRepositoryStub()
  const checkUserByEmailRepositoryStub = mockCheckUserByEmailRepositoryStub()
  const hasherStub = mockHasherStub()
  const sut = new DbRegisterUser(idGeneratorStub, registerUserRepositoryStub, checkUserByEmailRepositoryStub, hasherStub)
  jest.spyOn(checkUserByEmailRepositoryStub, 'checkByEmail').mockImplementation(async () => await Promise.resolve(null))
  return { sut, registerUserRepositoryStub, checkUserByEmailRepositoryStub, hasherStub, idGeneratorStub }
}

describe('DbRegisterUser Data Usecase', () => {
  test('Should call idGenerator correctly', async () => {
    const { sut, idGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(idGeneratorStub, 'generate')
    await sut.register(mockRequest())
    expect(generateSpy).toHaveBeenCalled()
  })

  test('Should throw if idGenerator throws', async () => {
    const { sut, idGeneratorStub } = makeSut()
    jest.spyOn(idGeneratorStub, 'generate').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.register(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call registerUserRepository with correct values', async () => {
    const { sut, registerUserRepositoryStub } = makeSut()
    const registerSpy = jest.spyOn(registerUserRepositoryStub, 'register')
    await sut.register(mockRequest())
    expect(registerSpy).toBeCalledWith(mockRegisterUserRepositoryParams())
  })

  test('Should return false if registerUserRepository returns false', async () => {
    const { sut, registerUserRepositoryStub } = makeSut()
    jest.spyOn(registerUserRepositoryStub, 'register').mockReturnValueOnce(Promise.resolve(false))
    const isValid = await sut.register(mockRequest())
    expect(isValid).toBe(false)
  })

  test('Should throw if registerUserRepository throws', async () => {
    const { sut, registerUserRepositoryStub } = makeSut()
    jest.spyOn(registerUserRepositoryStub, 'register').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.register(mockRequest())
    await expect(promise).rejects.toThrow()
  })

  test('Should call checkUserByEmailRepository with correct value', async () => {
    const { sut, checkUserByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(checkUserByEmailRepositoryStub, 'checkByEmail')
    await sut.register(mockRequest())
    expect(loadByEmailSpy).toBeCalledWith(mockRequest().email)
  })

  test('Should return false if checkUserByEmailRepository success', async () => {
    const { sut, checkUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(checkUserByEmailRepositoryStub, 'checkByEmail').mockImplementationOnce(async () => await Promise.resolve(true))
    const exist = await sut.register(mockRequest())
    expect(exist).toBe(false)
  })

  test('Should throw if checkUserByEmailRepository throws', async () => {
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
    const isValid = await sut.register(mockRequest())
    expect(isValid).toBe(true)
  })
})
