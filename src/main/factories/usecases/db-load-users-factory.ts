import { DbLoadUsers } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadUsers = (): DbLoadUsers => {
  const userMongoRepository = new UserMongoRepository()
  return new DbLoadUsers(userMongoRepository)
}
