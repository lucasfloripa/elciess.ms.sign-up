import { LoadUsers } from '@/domain/usecases'
import { LoadUsersRepository } from '@/data/protocols'

export class DbLoadUsers implements LoadUsers {
  constructor (
    private readonly loadUsersRepository: LoadUsersRepository
  ) { }

  async load (): Promise<LoadUsers.Result> {
    return this.loadUsersRepository.loadAll()
  }
}
