import { User } from '@/domain/models'

export interface RoleAuthentication {
  auth: (token: string, role: string) => Promise<RoleAuthentication.Result>
}

export namespace RoleAuthentication {
  export type Result = User
}
