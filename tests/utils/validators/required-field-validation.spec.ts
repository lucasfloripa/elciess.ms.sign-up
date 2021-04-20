import { RequiredFieldValidation } from '@/utils/validators'
import { MissingParamError } from '@/presentation/errors'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('any_value')
}

describe('RequiredField Validation', () => {
  test('Should return a MissinParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_value'))
  })

  test('Should not return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({ any_value: 'any_value' })
    expect(error).toBeFalsy()
  })
})
