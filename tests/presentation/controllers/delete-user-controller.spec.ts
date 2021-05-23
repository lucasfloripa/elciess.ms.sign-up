import { DeleteUserController } from '@/presentation/controllers'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers'
import { Validation } from '@/presentation/protocols'
import { DeleteUser } from '@/domain/usecases'
import { mockValidationStub } from '@/tests/utils/mocks'
import { mockDeleteUser } from '@/tests/presentation/mocks'

const makeRequest = (): DeleteUserController.Params => ({
  id: 'any_id'
})

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
    const request = makeRequest()
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledWith(request)
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const request = makeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call deleteUser with correct id', async () => {
    const { sut, deleteUserStub } = makeSut()
    const deleteSpy = jest.spyOn(deleteUserStub, 'delete')
    const request = makeRequest()
    await sut.handle(request)
    expect(deleteSpy).toHaveBeenCalledWith(request.id)
  })

  test('Should return 404 if deleteUser returns null', async () => {
    const { sut, deleteUserStub } = makeSut()
    jest.spyOn(deleteUserStub, 'delete').mockReturnValueOnce(Promise.resolve(null))
    const request = makeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(notFound())
  })

  test('Should return 500 if deleteUser throws', async () => {
    const { sut, deleteUserStub } = makeSut()
    jest.spyOn(deleteUserStub, 'delete').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })
    const request = makeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const request = makeRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(ok(`User with id: ${request.id} deleted`))
  })
})
