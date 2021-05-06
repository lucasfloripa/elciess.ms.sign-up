import { HttpResponse, Middleware } from '@/presentation/protocols'
import { unauthorized } from '@/presentation/helpers'
import { LoadUserByToken } from '@/domain/usecases'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadUserByToken: LoadUserByToken,
    private readonly role?: string
  ) { }

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    const { accessToken } = request
    if (accessToken) {
      await this.loadUserByToken.loadByToken(accessToken)
      return null
    }
    return unauthorized()
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken: string
  }
}
