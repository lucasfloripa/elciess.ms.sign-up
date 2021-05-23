import { DeleteUserController } from '@/presentation/controllers'
import { DeleteUser } from '@/domain/usecases'

const mockDeleteUser = (): DeleteUser => {
  class DeleteUserStub implements DeleteUser {
    async delete (id: string): Promise<void> {
      return null
    }
  }
  return new DeleteUserStub()
}

type SutTypes = {
  sut: DeleteUserController
  deleteUserStub: DeleteUser
}

const makeSut = (): SutTypes => {
  const deleteUserStub = mockDeleteUser()
  const sut = new DeleteUserController(deleteUserStub)
  return { sut, deleteUserStub }
}

describe('DeleteUser Controller', () => {
  test('Should call deleteUser with correct id', async () => {
    const { sut, deleteUserStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteUserStub, 'delete')
    await sut.handle({ id: 'any_id' })
    expect(deleteSpy).toHaveBeenCalledWith('any_id')
  })
})
