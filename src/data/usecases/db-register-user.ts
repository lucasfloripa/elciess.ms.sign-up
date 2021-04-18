import { RegisterUser } from '@/domain/usecases'
import { RegisterUserRepository } from '@/data/protocols'

export class DbRegisterUser implements RegisterUser {
  constructor (
    private readonly registerUserRepository: RegisterUserRepository
  ) {}

  async register (registerUserParams: RegisterUser.Params): Promise<boolean> {
    await this.registerUserRepository.register(registerUserParams)
    return null
  }
}
