import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadUsers } from '@/domain/usecases'
import { noContent } from '@/presentation/helpers'

export class LoadUsersController implements Controller {
  constructor (
    private readonly loadUsers: LoadUsers
  ) { }

  async handle (): Promise<HttpResponse> {
    const users = await this.loadUsers.load()
    if (!users) {
      return noContent()
    }
    return null
  }
}
