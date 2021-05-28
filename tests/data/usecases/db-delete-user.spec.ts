import { DbDeleteUser } from '@/data/usecases'
import { DeleteUserByIdRepository } from '@/data/protocols'
import { mockDeleteUserByIdRepository } from '@/tests/data/mocks'

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

  test('Should return false if deleteUserByIdRepository returns false', async () => {
    const { sut, deleteUserByIdRepository } = makeSut()
    jest.spyOn(deleteUserByIdRepository, 'deleteById').mockReturnValueOnce(Promise.resolve(false))
    const exist = await sut.delete('any_id')
    expect(exist).toBeFalsy()
  })

  test('Should throw if deleteUserByIdRepository throws', async () => {
    const { sut, deleteUserByIdRepository } = makeSut()
    jest.spyOn(deleteUserByIdRepository, 'deleteById').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.delete('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if deleteUserByIdRepository success', async () => {
    const { sut } = makeSut()
    const isValid = await sut.delete('any_id')
    expect(isValid).toBeTruthy()
  })
})
