import { RegisterUser } from '@/domain/usecases'
import { CheckUserByEmailRepository, RegisterUserRepository, Hasher } from '@/data/protocols'

export class DbRegisterUser implements RegisterUser {
  constructor (
    private readonly registerUserRepository: RegisterUserRepository,
    private readonly checkUserByEmailRepository: CheckUserByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async register (registerUserParams: RegisterUser.Params): Promise<boolean> {
    const { email, password } = registerUserParams
    const exist = await this.checkUserByEmailRepository.checkByEmail(email)
    let isValid = false
    if (!exist) {
      const hashedPassword = await this.hasher.hash(password)
      isValid = await this.registerUserRepository.register({ email, password: hashedPassword })
    }
    return isValid
  }
}
