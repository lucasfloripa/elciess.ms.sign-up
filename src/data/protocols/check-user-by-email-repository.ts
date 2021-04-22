export interface CheckUserByEmailRepository {
  checkByEmail: (email: string) => Promise<boolean>
}
