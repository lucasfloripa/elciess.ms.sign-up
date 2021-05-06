import { HttpResponse, Middleware } from '@/presentation/protocols'
import { unauthorized } from '@/presentation/helpers'

export class AuthMiddleware implements Middleware {
  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    const { accessToken } = request
    if (accessToken) {
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
