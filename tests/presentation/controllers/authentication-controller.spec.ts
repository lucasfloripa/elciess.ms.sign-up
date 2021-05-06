import { AuthenticationController } from '@/presentation/controllers'
import { Validation } from '@/presentation/protocols'
import { badRequest, serverError, unauthorized, ok } from '@/presentation/helpers'
import { Authenticate } from '@/domain/usecases'
import { mockValidationStub } from '@/tests/utils/mocks'
import { mockAuthenticateStub } from '@/tests/presentation/mocks'

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

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticateStub } = makeSut()
    jest.spyOn(authenticateStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authenticate throws', async () => {
    const { sut, authenticateStub } = makeSut()
    jest.spyOn(authenticateStub, 'auth').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 with an accessToken and user email on success', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok({ email: request.email, accessToken: 'access_token' }))
  })
})
