import { Authenticate } from '@/domain/usecases'
import { LoadUserByEmailRepository } from '@/data/protocols'

export class DbAuthentication implements Authenticate {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) {}

  async auth (credentials: Authenticate.Params): Promise<string> {
    const { email } = credentials
    const user = await this.loadUserByEmailRepository.loadByEmail(email)
    if (user) {
      return 'any'
    }
    return null
  }
}
