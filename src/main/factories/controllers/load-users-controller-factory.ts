import { LoadUsersController } from '@/presentation/controllers'
import { makeDbLoadUsers } from '@/main/factories/usecases'

export const makeLoadUsersController = (): LoadUsersController => {
  const dbLoadusers = makeDbLoadUsers()
  return new LoadUsersController(dbLoadusers)
}
