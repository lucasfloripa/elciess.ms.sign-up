import { HttpResponse, Middleware } from '@/presentation/protocols'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { RoleAuthentication } from '@/domain/usecases'

export class AuthRoleMiddleware implements Middleware {
  constructor (
    private readonly roleAuthentication: RoleAuthentication,
    private readonly role: string
  ) { }

  async handle (request: AuthRoleMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        const user = await this.roleAuthentication.auth(accessToken, this.role)
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
