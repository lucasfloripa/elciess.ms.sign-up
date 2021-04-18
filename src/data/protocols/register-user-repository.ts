import { RegisterUser } from '@/domain/usecases'

export interface RegisterUserRepository {
  register: (data: RegisterUserRepository.Params) => Promise<boolean>
}

export namespace RegisterUserRepository {
  export type Params = RegisterUser.Params
  export type Result = boolean
}
