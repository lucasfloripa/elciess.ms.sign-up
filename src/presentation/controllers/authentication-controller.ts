import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import { Authenticate } from '@/domain/usecases'

export class AuthenticationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authenticate: Authenticate
  ) { }

  async handle (request: AuthenticationController.Params): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.authenticate.auth(request)
    return null
  }
}

export namespace AuthenticationController {
  export type Params = {
    email: string
    password: string
  }
}
