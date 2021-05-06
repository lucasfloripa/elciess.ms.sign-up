import { HttpResponse, Middleware } from '@/presentation/protocols'
import { forbidden, unauthorized } from '@/presentation/helpers'
import { LoadUserByToken } from '@/domain/usecases'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadUserByToken: LoadUserByToken,
    private readonly role?: string
  ) { }

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    const { accessToken } = request
    if (accessToken) {
      const user = await this.loadUserByToken.loadByToken(accessToken)
      if (user) {
        return null
      }
      return forbidden(new AccessDeniedError())
    }
    return unauthorized()
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string
  }
}
