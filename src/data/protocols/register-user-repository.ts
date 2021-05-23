export interface RegisterUserRepository {
  register: (data: RegisterUserRepository.Params) => Promise<boolean>
}

export namespace RegisterUserRepository {
  export type Params = {
    id: string
    email: string
    password: string
  }
  export type Result = boolean
}
