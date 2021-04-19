import { RegisterUserRepository } from '@/data/protocols'
import { DbRegisterUser } from '@/data/usecases'
import { mockRegisterUserRepositoryStub } from '../mocks/mock-register-user-repository'

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
    await sut.register({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(registerSpy).toBeCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })
})
