import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: SignUpController.Params): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
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
