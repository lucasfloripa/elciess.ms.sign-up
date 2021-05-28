import { DbDeleteUser } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db/mongodb'

export const makeDbDeleteUser = (): DbDeleteUser => {
  const userMongoRepository = new UserMongoRepository()
  return new DbDeleteUser(userMongoRepository)
}
