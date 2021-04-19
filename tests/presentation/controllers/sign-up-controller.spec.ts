import { Controller, Validation } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers'
import { mockValidationStub } from '@/tests/presentation/mocks'

const mockRequest = (): SignUpController.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
})

type SutTypes = {
  sut: Controller
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const sut = new SignUpController(validationStub)
  return { sut, validationStub }
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
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new Error()
    })
  })
})
