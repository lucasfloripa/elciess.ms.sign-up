import { DbRegisterUser } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db/mongodb'
import { BcryptAdapter } from '@/infra/cryptography'

export const makeDbRegisterUser = (): DbRegisterUser => {
  const salt = 12
  const userMongoRepository = new UserMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbRegisterUser(userMongoRepository, userMongoRepository, bcryptAdapter)
}
