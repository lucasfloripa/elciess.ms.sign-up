import { AuthRoleMiddleware } from '@/presentation/middlewares'
import { makeDbRoleAuthentication } from '@/main/factories/usecases'

export const makeAuthAdminMiddleware = (): AuthRoleMiddleware => {
  return new AuthRoleMiddleware(makeDbRoleAuthentication(), 'admin')
}
