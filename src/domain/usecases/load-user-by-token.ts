import { User } from '@/domain/models'

export interface LoadUserByToken {
  loadByToken: (token: string) => Promise<LoadUserByToken.Result>
}

export namespace LoadUserByToken {
  export type Result = User
}
