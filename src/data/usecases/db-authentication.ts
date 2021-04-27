import { Authenticate } from '@/domain/usecases'
import { LoadUserByEmailRepository, HashComparer, Encrypter } from '@/data/protocols'

export class DbAuthentication implements Authenticate {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (credentials: Authenticate.Params): Promise<string> {
    const { email, password } = credentials
    const user = await this.loadUserByEmailRepository.loadByEmail(email)
    if (user) {
      const isValid = await this.hashComparer.compare(password, user.password)
      if (isValid) {
        await this.encrypter.encrypt(user.id)
        return 'any'
      }
    }
    return null
  }
}
