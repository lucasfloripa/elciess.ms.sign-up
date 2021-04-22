import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '@/utils/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly email: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error {
    this.emailValidator.isValid(input[this.email])
    return null
  }
}
