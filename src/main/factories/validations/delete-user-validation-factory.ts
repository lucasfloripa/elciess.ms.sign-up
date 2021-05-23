import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'

export const makeDeleteUserValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new RequiredFieldValidation('id'))
  return new ValidationComposite(validations)
}
