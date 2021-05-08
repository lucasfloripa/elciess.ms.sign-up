import { HttpResponse, Middleware } from '@/presentation/protocols'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers'
import { LoadUserByToken } from '@/domain/usecases'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthRoleMiddleware implements Middleware {
  constructor (
    private readonly loadUserByToken: LoadUserByToken,
    private readonly role?: string
  ) { }

  async handle (request: AuthRoleMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const user = await this.loadUserByToken.loadByToken(accessToken, this.role)
        if (user) {
          return ok({ userId: user.id })
        }
        return forbidden(new AccessDeniedError())
      }
      return unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AuthRoleMiddleware {
  export type Request = {
    accessToken: string
  }
}
