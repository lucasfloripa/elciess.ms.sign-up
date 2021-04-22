import { RequiredFieldValidation } from '@/utils/validators'
import { MissingParamError } from '@/presentation/errors'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('fieldToValidate')
}

describe('RequiredField Validation', () => {
  test('Should return a MissinParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidFieldToValidate: 'any_value' })
    expect(error).toEqual(new MissingParamError('fieldToValidate'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ fieldToValidate: 'any_value' })
    expect(error).toBeFalsy()
  })
})
