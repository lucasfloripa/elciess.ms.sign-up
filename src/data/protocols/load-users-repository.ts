import { User } from '@/domain/models'

export interface LoadUsersRepository {
  loadAll: () => Promise<LoadUsersRepository.Result>
}

export namespace LoadUsersRepository {
  export type Result = User[]
}
