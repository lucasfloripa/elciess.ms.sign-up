import { DbRegisterUser } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db/mongodb'
import { BcryptAdapter } from '@/infra/cryptography'
import { UuidAdapter } from '@/infra/generators'

export const makeDbRegisterUser = (): DbRegisterUser => {
  const salt = 12
  const uuidAdapter = new UuidAdapter()
  const userMongoRepository = new UserMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbRegisterUser(uuidAdapter, userMongoRepository, userMongoRepository, bcryptAdapter)
}
