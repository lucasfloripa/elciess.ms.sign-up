import { AuthenticationController } from '@/presentation/controllers'
import { Validation } from '@/presentation/protocols'
import { mockValidationStub } from '@/tests/utils/mocks'

const mockRequest = (): AuthenticationController.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: AuthenticationController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const sut = new AuthenticationController(validationStub)
  return { sut, validationStub }
}

describe('Authentication Controller', () => {
  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockRequest())
  })
})
