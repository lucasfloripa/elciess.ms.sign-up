import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, notFound, serverError } from '@/presentation/helpers'
import { DeleteUser } from '@/domain/usecases'

export class DeleteUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly deleteUser: DeleteUser
  ) { }

  async handle (request: DeleteUserController.Params): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
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
