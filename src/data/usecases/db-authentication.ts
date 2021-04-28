import { Authenticate } from '@/domain/usecases'
import { LoadUserByEmailRepository, HashComparer, Encrypter, UpdateUserAccessTokenRepository } from '@/data/protocols'

export class DbAuthentication implements Authenticate {
  constructor (
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateUserAccessTokenRepository: UpdateUserAccessTokenRepository
  ) {}

  async auth (credentials: Authenticate.Params): Promise<string> {
    const { email, password } = credentials
    const user = await this.loadUserByEmailRepository.loadByEmail(email)
    if (user) {
      const isValid = await this.hashComparer.compare(password, user.password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(user.id)
        await this.updateUserAccessTokenRepository.updateAccessToken(user.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
