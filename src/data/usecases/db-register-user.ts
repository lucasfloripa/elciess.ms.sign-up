import { RegisterUser } from '@/domain/usecases'
import { LoadUserByEmailRepository, RegisterUserRepository } from '@/data/protocols'

export class DbRegisterUser implements RegisterUser {
  constructor (
    private readonly registerUserRepository: RegisterUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) {}

  async register (registerUserParams: RegisterUser.Params): Promise<boolean> {
    await this.loadUserByEmailRepository.loadByEmail(registerUserParams.email)

    const user = await this.registerUserRepository.register(registerUserParams)
    if (!user) {
      return false
    }
    return null
  }
}
