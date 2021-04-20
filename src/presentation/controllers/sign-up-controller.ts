import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'
import { RegisterUser } from '@/domain/usecases'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly registerUser: RegisterUser
  ) {}

  async handle (request: SignUpController.Params): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const { email, password } = request
    const isValid = await this.registerUser.register({
      email,
      password
    })
    if (!isValid) {
      return forbidden(new EmailInUseError())
    }
    return null
  }
}

export namespace SignUpController {
  export type Params = {
    email: string
    password: string
    passwordConfirmation: string
  }
}
