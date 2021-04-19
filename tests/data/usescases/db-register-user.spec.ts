import { RegisterUserRepository } from '@/data/protocols'
import { DbRegisterUser } from '@/data/usecases'
import { mockRegisterUserParams } from '@/tests/domain/mocks/mock-register-user-params'
import { mockRegisterUserRepositoryStub } from '@/tests/data/mocks/mock-register-user-repository'

type SutTypes = {
  sut: DbRegisterUser
  registerUserRepositoryStub: RegisterUserRepository
}

const makeSut = (): SutTypes => {
  const registerUserRepositoryStub = mockRegisterUserRepositoryStub()
  const sut = new DbRegisterUser(registerUserRepositoryStub)
  return { sut, registerUserRepositoryStub }
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
})
