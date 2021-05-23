import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '@/utils/validators'
import { makeDeleteUserValidation } from '@/main/factories/validations'

jest.mock('@/utils/validators/validation-composite')

describe('Delete User Validation Factory', () => {
  test('Should call Validation Composite with all Validators', () => {
    makeDeleteUserValidation()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('id'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
