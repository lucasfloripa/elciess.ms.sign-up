import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadUsers } from '@/domain/usecases'
import { noContent, serverError, ok } from '@/presentation/helpers'

export class LoadUsersController implements Controller {
  constructor (
    private readonly loadUsers: LoadUsers
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const users = await this.loadUsers.load()
      if (!users) {
        return noContent()
      }
      return ok(users)
    } catch (error) {
      return serverError(error)
    }
  }
}
