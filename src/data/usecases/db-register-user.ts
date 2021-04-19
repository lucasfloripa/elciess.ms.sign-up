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
      const hashedPassword = await this.hasher.hash(password)
      const user = await this.registerUserRepository.register({ email, password: hashedPassword })
      if (!user) {
        return false
      }
      return true
    }
    return false
  }
}
