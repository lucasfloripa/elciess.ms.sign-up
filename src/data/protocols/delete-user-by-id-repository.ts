export interface DeleteUserByIdRepository {
  deleteById: (userId: string) => Promise<boolean>
}
