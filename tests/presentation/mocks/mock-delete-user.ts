import { DeleteUser } from '@/domain/usecases'

export const mockDeleteUser = (): DeleteUser => {
  class DeleteUserStub implements DeleteUser {
    async delete (id: string): Promise<boolean> {
      return true
    }
  }
  return new DeleteUserStub()
}
