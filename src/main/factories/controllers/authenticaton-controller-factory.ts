import { AuthenticationController } from '@/presentation/controllers'
import { makeDbAuthentication } from '@/main/factories/usecases'
import { makeAuthenticationValidation } from '@/main/factories/validations'

export const makeAuthenticationController = (): AuthenticationController => {
  return new AuthenticationController(makeAuthenticationValidation(), makeDbAuthentication())
}
