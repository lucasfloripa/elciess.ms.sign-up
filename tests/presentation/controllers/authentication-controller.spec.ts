import { AuthenticationController } from '@/presentation/controllers'
import { Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import { Authenticate } from '@/domain/usecases'
import { mockValidationStub } from '@/tests/utils/mocks'

const mockAuthenticateStub = (): Authenticate => {
  class AuthenticateStub implements Authenticate {
    async auth (credentials: Authenticate.Params): Promise<string> {
      return await Promise.resolve('access_token')
    }
  }
  return new AuthenticateStub()
}

const mockRequest = (): AuthenticationController.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: AuthenticationController
  validationStub: Validation
  authenticateStub: Authenticate
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const authenticateStub = mockAuthenticateStub()
  const sut = new AuthenticationController(validationStub, authenticateStub)
  return { sut, validationStub, authenticateStub }
}

describe('Authentication Controller', () => {
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

  test('Should call Authenticate with correct values', async () => {
    const { sut, authenticateStub } = makeSut()
    const authSpy = jest.spyOn(authenticateStub, 'auth')
    await sut.handle(mockRequest())
    expect(authSpy).toHaveBeenCalledWith(mockRequest())
  })
})
