import { RegisterUserRepository, LoadUserByEmailRepository } from '@/data/protocols'
import { DbRegisterUser } from '@/data/usecases'
import { mockRegisterUserParams } from '@/tests/domain/mocks/mock-register-user-params'
import { mockRegisterUserRepositoryStub, mockLoadUserByEmailRepositoryStub, mockLoadUserByEmailResult } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbRegisterUser
  registerUserRepositoryStub: RegisterUserRepository
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
}

const makeSut = (): SutTypes => {
  const registerUserRepositoryStub = mockRegisterUserRepositoryStub()
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepositoryStub()
  const sut = new DbRegisterUser(registerUserRepositoryStub, loadUserByEmailRepositoryStub)
  jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementation(async () => await Promise.resolve(null))
  return { sut, registerUserRepositoryStub, loadUserByEmailRepositoryStub }
}

describe('DbRegisterUser', () => {
  test('Should call registerUserRepository with correct values', async () => {
    const { sut, registerUserRepositoryStub } = makeSut()
    const registerSpy = jest.spyOn(registerUserRepositoryStub, 'register')
    await sut.register(mockRegisterUserParams())
    expect(registerSpy).toBeCalledWith(mockRegisterUserParams())
  })

  test('Should return false if registerUserRepository returns false', async () => {
    const { sut, registerUserRepositoryStub } = makeSut()
    jest.spyOn(registerUserRepositoryStub, 'register').mockReturnValueOnce(Promise.resolve(false))
    const user = await sut.register(mockRegisterUserParams())
    expect(user).toBe(false)
  })

  test('Should throw if registerUserRepository throws', async () => {
    const { sut, registerUserRepositoryStub } = makeSut()
    jest.spyOn(registerUserRepositoryStub, 'register').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.register(mockRegisterUserParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call loadUserByEmailRepository with correct values', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail')
    await sut.register(mockRegisterUserParams())
    expect(loadByEmailSpy).toBeCalledWith(mockRegisterUserParams().email)
  })

  test('Should return false if loadUserByEmailRepository success', async () => {
    const { sut, loadUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadUserByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(async () => await Promise.resolve(mockLoadUserByEmailResult()))
    const user = await sut.register(mockRegisterUserParams())
    expect(user).toBe(false)
  })
})
