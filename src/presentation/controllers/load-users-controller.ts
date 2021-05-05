import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadUsers } from '@/domain/usecases'

export class LoadUsersController implements Controller {
  constructor (
    private readonly loadUsers: LoadUsers
  ) { }

  async handle (): Promise<HttpResponse> {
    await this.loadUsers.load()
    return null
  }
}
