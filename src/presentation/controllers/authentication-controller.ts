import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class AuthenticationController implements Controller {
  constructor (
    private readonly validation: Validation
  ) { }

  async handle (request: AuthenticationController.Params): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace AuthenticationController {
  export type Params = {
    email: string
    password: string
  }
}
