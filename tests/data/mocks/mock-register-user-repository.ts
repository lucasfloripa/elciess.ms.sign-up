import { RegisterUserRepository } from '@/data/protocols'

export const mockRegisterUserRepositoryStub = (): RegisterUserRepository => {
  class RegisterUserRepositoryStub implements RegisterUserRepository {
    async register (data: RegisterUserRepository.Params): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new RegisterUserRepositoryStub()
}
