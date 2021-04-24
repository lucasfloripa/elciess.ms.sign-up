import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '@/utils/validators'
import { EmailValidatorAdapter } from '@/infra/validators'
import { makeSignUpValidation } from '@/main/factories/validations'

jest.mock('@/utils/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  test('Should call Validation Composite with all Validators', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})