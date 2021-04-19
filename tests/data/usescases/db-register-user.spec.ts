import { RegisterUserRepository, LoadUserByEmailRepository } from '@/data/protocols'
import { DbRegisterUser } from '@/data/usecases'
import { mockRegisterUserParams } from '@/tests/domain/mocks/mock-register-user-params'
import { mockRegisterUserRepositoryStub } from '@/tests/data/mocks/mock-register-user-repository'

const mockLoadUserByEmailRepositoryStub = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
      return await Promise.resolve({
        id: 'any_id',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
    }
  }
  return new LoadUserByEmailRepositoryStub()
}

type SutTypes = {
  sut: DbRegisterUser
  registerUserRepositoryStub: RegisterUserRepository
  loadUserByEmailRepositoryStub: LoadUserByEmailRepository
}

const makeSut = (): SutTypes => {
  const registerUserRepositoryStub = mockRegisterUserRepositoryStub()
  const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepositoryStub()
  const sut = new DbRegisterUser(registerUserRepositoryStub, loadUserByEmailRepositoryStub)
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
})
