import { DbAuthentication } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db/mongodb'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'

export const makeDbAuthentication = (): DbAuthentication => {
  const salt = 12
  const userMongoRepository = new UserMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter()
  return new DbAuthentication(userMongoRepository, bcryptAdapter, jwtAdapter, userMongoRepository)
}
