export interface RegisterUser {
  register: (registerUserParams: RegisterUser.Params) => Promise<RegisterUser.Result>
}

export namespace RegisterUser {
  export type Params = {
    email: string
    password: string
  }
  export type Result = boolean
}
