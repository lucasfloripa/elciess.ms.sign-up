import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, serverError, ok } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'
import { RegisterUser } from '@/domain/usecases'

export class RegisterUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly registerUser: RegisterUser
  ) {}

  async handle (request: RegisterUserController.Params): Promise<HttpResponse> {
    try {
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
      return ok({ message: `${request.email} register!` })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace RegisterUserController {
  export type Params = {
    email: string
    password: string
    passwordConfirmation: string
  }
}
