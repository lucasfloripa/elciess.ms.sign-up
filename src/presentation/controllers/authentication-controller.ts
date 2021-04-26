import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class AuthenticationController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: AuthenticationController.Params): Promise<HttpResponse> {
    this.validation.validate(request)
    return null
  }
}

export namespace AuthenticationController {
  export type Params = {
    email: string
    password: string
  }
}
