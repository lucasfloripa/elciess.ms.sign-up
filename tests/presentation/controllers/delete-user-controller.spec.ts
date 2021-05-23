import { DeleteUserController } from '@/presentation/controllers'
import { badRequest, notFound, serverError } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { DeleteUser } from '@/domain/usecases'
import { mockValidationStub } from '@/tests/utils/mocks'

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
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const deleteUserStub = mockDeleteUser()
  const validationStub = mockValidationStub()
  const sut = new DeleteUserController(validationStub, deleteUserStub)
  return { sut, deleteUserStub, validationStub }
}

describe('DeleteUser Controller', () => {
  test('Should call validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle({ id: 'any_id' })
    expect(validateSpy).toHaveBeenCalledWith({ id: 'any_id' })
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle({ id: 'any_id' })
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

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
