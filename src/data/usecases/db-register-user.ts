import { RegisterUser } from '@/domain/usecases'
import { LoadUserByEmailRepository, RegisterUserRepository, Hasher } from '@/data/protocols'

export class DbRegisterUser implements RegisterUser {
  constructor (
    private readonly registerUserRepository: RegisterUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async register (registerUserParams: RegisterUser.Params): Promise<boolean> {
    const { email, password } = registerUserParams
    const exist = await this.loadUserByEmailRepository.loadByEmail(email)
    if (!exist) {
      await this.hasher.hash(password)
      const user = await this.registerUserRepository.register(registerUserParams)
      if (!user) {
        return false
      }
      return true
    }
    return false
  }
}
