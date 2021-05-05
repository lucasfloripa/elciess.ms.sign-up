import { LoadUsersController } from '@/presentation/controllers'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { LoadUsers } from '@/domain/usecases'
import { mockListUserModel } from '@/tests/domain/mocks'
import { mockLoadUsersStub } from '@/tests/presentation/mocks'

type SutTypes = {
  sut: LoadUsersController
  loadUsersStub: LoadUsers
}

const makeSut = (): SutTypes => {
  const loadUsersStub = mockLoadUsersStub()
  const sut = new LoadUsersController(loadUsersStub)
  return { sut, loadUsersStub }
}

describe('LoadUsersController', () => {
  test('Should call loadUsers correctly', async () => {
    const { sut, loadUsersStub } = makeSut()
    const loadUsersSpy = jest.spyOn(loadUsersStub, 'load')
    await sut.handle()
    expect(loadUsersSpy).toHaveBeenCalled()
  })

  test('Should return 204 if loadUsers returns null', async () => {
    const { sut, loadUsersStub } = makeSut()
    jest.spyOn(loadUsersStub, 'load').mockReturnValueOnce(null)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if loadUsers throws', async () => {
    const { sut, loadUsersStub } = makeSut()
    jest.spyOn(loadUsersStub, 'load').mockImplementationOnce(async () => {
      return Promise.reject(new Error())
    })
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(mockListUserModel()))
  })
})
