import { User } from '@/domain/models'

export interface LoadUsers {
  load: () => Promise<LoadUsers.Result>
}

export namespace LoadUsers {
  export type Result = User[]
}
