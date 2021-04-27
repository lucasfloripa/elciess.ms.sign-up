import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, unauthorized } from '@/presentation/helpers'
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
    const accessToken = await this.authenticate.auth(request)
    if (!accessToken) {
      return unauthorized()
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
