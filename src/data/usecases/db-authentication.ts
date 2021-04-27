import { Authenticate } from '@/domain/usecases'
import { LoadUserByEmailRepository, HashComparer } from '@/data/protocols'

export class DbAuthentication implements Authenticate {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (credentials: Authenticate.Params): Promise<string> {
    const { email, password } = credentials
    const user = await this.loadUserByEmailRepository.loadByEmail(email)
    if (user) {
      const isValid = await this.hashComparer.compare(password, user.password)
      if (isValid) {
        return 'any'
      }
    }
    return null
  }
}
