import { Controller, HttpResponse } from '@/presentation/protocols'
import { DeleteUser } from '@/domain/usecases'

export class DeleteUserController implements Controller {
  constructor (
    private readonly deleteUser: DeleteUser
  ) { }

  async handle (request: DeleteUserController.Params): Promise<HttpResponse> {
    await this.deleteUser.delete(request.id)
    return null
  }
}

export namespace DeleteUserController {
  export type Params = {
    id: string
  }
}
