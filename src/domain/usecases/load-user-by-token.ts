import { User } from '@/domain/models'

export interface LoadUserByToken {
  loadByToken: (accessToken: string, role?: string) => Promise<LoadUserByToken.Result>
}

export namespace LoadUserByToken {
  export type Result = User
}
