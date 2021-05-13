import { User } from '@/domain/models'

export interface LoadUserByIdRepository {
  loadById: (id: string) => Promise<LoadUserByIdRepository.Result>
}

export namespace LoadUserByIdRepository {
  export type Result = User
}
