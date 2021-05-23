import { RegisterUser } from '@/domain/usecases'
import { CheckUserByEmailRepository, RegisterUserRepository, Hasher, IdGenerator } from '@/data/protocols'

export class DbRegisterUser implements RegisterUser {
  constructor (
    private readonly idGenerator: IdGenerator,
    private readonly registerUserRepository: RegisterUserRepository,
    private readonly checkUserByEmailRepository: CheckUserByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async register (registerUserParams: RegisterUser.Params): Promise<boolean> {
    const { email, password } = registerUserParams
    const exist = await this.checkUserByEmailRepository.checkByEmail(email)
    let isValid = false
    if (!exist) {
      const id = await this.idGenerator.generate()
      const hashedPassword = await this.hasher.hash(password)
      isValid = await this.registerUserRepository.register({
        id,
        email,
        password: hashedPassword
      })
    }
    return isValid
  }
}
