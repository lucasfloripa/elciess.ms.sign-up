export interface LoadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadUserByEmailRepository.Result>
}

export namespace LoadUserByEmailRepository {
  export type Result = {
    id: string
    email: string
    password: string
  }
}
