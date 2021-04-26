export interface RegisterUser {
  register: (registerUserParams: RegisterUser.Params) => Promise<boolean>
}

export namespace RegisterUser {
  export type Params = {
    email: string
    password: string
  }
}
