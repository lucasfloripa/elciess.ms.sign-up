import { User } from '@/domain/models'

export interface LoadUserByTokenRepository {
  loadByToken: (token: string) => Promise<LoadUserByTokenRepository.Result>
}

export namespace LoadUserByTokenRepository {
  export type Result = User
}
