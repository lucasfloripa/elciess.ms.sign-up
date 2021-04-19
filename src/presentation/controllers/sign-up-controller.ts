import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: SignUpController.Params): Promise<HttpResponse> {
    this.validation.validate(request)
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
