export interface Authenticate {
  auth: (credentials: Authenticate.Params) => Promise<string>
}

export namespace Authenticate {
  export type Params = {
    email: string
    password: string
  }
}
