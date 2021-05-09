import { DbRoleAuthentication } from '@/data/usecases'
import { RoleAuthentication } from '@/domain/usecases'
import { UserMongoRepository } from '@/infra/db/mongodb'
import { JwtAdapter } from '@/infra/cryptography'

export const makeDbRoleAuthentication = (): RoleAuthentication => {
  const jwtAdapter = new JwtAdapter()
  const userMongoRepository = new UserMongoRepository()
  return new DbRoleAuthentication(jwtAdapter, userMongoRepository)
}
