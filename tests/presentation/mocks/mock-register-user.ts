import { RegisterUser } from '@/domain/usecases'

export const mockRegisterUserStub = (): RegisterUser => {
  class RegisterUserStub implements RegisterUser {
    async register (registerUserParams: RegisterUser.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new RegisterUserStub()
}
