import { RegisterUserController } from '@/presentation/controllers'
import { makeDbRegisterUser } from '@/main/factories/usecases'
import { makeRegisterUserValidation } from '@/main/factories/validations'

export const makeRegisterUserController = (): RegisterUserController => {
  return new RegisterUserController(makeRegisterUserValidation(), makeDbRegisterUser())
}
