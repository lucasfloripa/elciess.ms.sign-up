export interface DeleteUser {
  delete: (id: string) => Promise<boolean>
}
