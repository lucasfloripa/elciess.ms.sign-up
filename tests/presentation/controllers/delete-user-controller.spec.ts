import { DeleteUserController } from '@/presentation/controllers'
import { notFound, serverError } from '@/presentation/helpers'
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

  test('Should return 500 if deleteUser throws', async () => {
    const { sut, deleteUserStub } = makeSut()
    jest.spyOn(deleteUserStub, 'delete').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })
    const httpResponse = await sut.handle({ id: 'any_id' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
