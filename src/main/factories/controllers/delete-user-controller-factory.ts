import { DeleteUserController } from '@/presentation/controllers'
import { makeDbDeleteUser } from '@/main/factories/usecases'
import { makeDeleteUserValidation } from '@/main/factories/validations'

export const makeDeleteUserController = (): DeleteUserController => {
  return new DeleteUserController(makeDeleteUserValidation(), makeDbDeleteUser())
}
