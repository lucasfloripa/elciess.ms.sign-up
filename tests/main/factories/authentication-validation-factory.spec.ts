import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/utils/validators'
import { EmailValidatorAdapter } from '@/infra/validators'
import { makeAuthenticationValidation } from '@/main/factories/validations'

jest.mock('@/utils/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  test('Should call Validation Composite with all Validators', () => {
    makeAuthenticationValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
