import { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/utils/validators'

const mockRequest = (): string => 'any_string'

const mockValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs: Validation[] = [
    mockValidationStub(),
    mockValidationStub()
  ]
  const sut = new ValidationComposite(validationStubs)
  return { sut, validationStubs }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate(mockRequest())
    expect(error).toEqual(new Error())
  })
})
