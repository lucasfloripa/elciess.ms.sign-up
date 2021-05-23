import { DbDeleteUser } from '@/data/usecases'
import { DeleteUserByIdRepository } from '@/data/protocols'

const mockDeleteUserByIdRepository = (): DeleteUserByIdRepository => {
  class DeleteUserByIdRepositoryStub implements DeleteUserByIdRepository {
    async deleteById (userId: string): Promise<boolean> {
      return null
    }
  }
  return new DeleteUserByIdRepositoryStub()
}

type SutTypes = {
  deleteUserByIdRepository: DeleteUserByIdRepository
  sut: DbDeleteUser
}

const makeSut = (): SutTypes => {
  const deleteUserByIdRepository = mockDeleteUserByIdRepository()
  const sut = new DbDeleteUser(deleteUserByIdRepository)
  return { sut, deleteUserByIdRepository }
}

describe('DbDeleteUser Data Usecase', () => {
  test('Should call deleteUserByIdRepository with correct id', async () => {
    const { sut, deleteUserByIdRepository } = makeSut()
    const deleteByIdSpy = jest.spyOn(deleteUserByIdRepository, 'deleteById')
    await sut.delete('any_id')
    expect(deleteByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return null if deleteUserByIdRepository returns null', async () => {
    const { sut, deleteUserByIdRepository } = makeSut()
    jest.spyOn(deleteUserByIdRepository, 'deleteById').mockReturnValueOnce(Promise.resolve(null))
    const exist = await sut.delete('any_id')
    expect(exist).toBeNull()
  })
})
