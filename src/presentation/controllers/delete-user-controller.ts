import { Controller, HttpResponse } from '@/presentation/protocols'
import { notFound, serverError } from '@/presentation/helpers'
import { DeleteUser } from '@/domain/usecases'

export class DeleteUserController implements Controller {
  constructor (
    private readonly deleteUser: DeleteUser
  ) { }

  async handle (request: DeleteUserController.Params): Promise<HttpResponse> {
    try {
      const exist = await this.deleteUser.delete(request.id)
      if (!exist) {
        return notFound()
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace DeleteUserController {
  export type Params = {
    id: string
  }
}
