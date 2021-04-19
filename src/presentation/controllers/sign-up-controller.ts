import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: SignUpController.Params): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return {
        statusCode: 400,
        body: new Error()
      }
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
