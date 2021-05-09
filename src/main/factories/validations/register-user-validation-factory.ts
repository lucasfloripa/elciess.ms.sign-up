import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation } from '@/utils/validators'
import { EmailValidatorAdapter } from '@/infra/validators'

export const makeRegisterUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
