import { DeleteUserController } from '@/presentation/controllers'
import { notFound } from '@/presentation/helpers'
import { DeleteUser } from '@/domain/usecases'

const mockDeleteUser = (): DeleteUser => {
  class DeleteUserStub implements DeleteUser {
    async delete (id: string): Promise<boolean> {
      return true
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

  test('Should return 404 if deleteUser returns null', async () => {
    const { sut, deleteUserStub } = makeSut()
    jest.spyOn(deleteUserStub, 'delete').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle({ id: 'any_id' })
    expect(httpResponse).toEqual(notFound())
  })
})
