import { Controller, Validation } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helpers'
import { RegisterUser } from '@/domain/usecases'
import { mockValidationStub } from '@/tests/presentation/mocks'

const mockRequest = (): SignUpController.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
})

const mockRegisterUserStub = (): RegisterUser => {
  class RegisterUserStub implements RegisterUser {
    async register (registerUserParams: RegisterUser.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new RegisterUserStub()
}

type SutTypes = {
  sut: Controller
  validationStub: Validation
  registerUserStub: RegisterUser
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const registerUserStub = mockRegisterUserStub()
  const sut = new SignUpController(validationStub, registerUserStub)
  return { sut, validationStub, registerUserStub }
}

describe('SignUp Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call RegisterUser with correct values', async () => {
    const { sut, registerUserStub } = makeSut()
    const registerSpy = jest.spyOn(registerUserStub, 'register')
    await sut.handle(mockRequest())
    expect(registerSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })
})
