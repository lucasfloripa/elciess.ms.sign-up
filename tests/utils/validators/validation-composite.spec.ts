import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/utils/validators'

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
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new Error())
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_param'))
  })
})
