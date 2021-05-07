import { AuthMiddleware } from '@/presentation/middlewares'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers'
import { LoadUserByToken } from '@/domain/usecases'
import { mockUserModel } from '@/tests/domain/mocks'
import { AccessDeniedError } from '@/presentation/errors'

const mockLoadUserByToken = (): LoadUserByToken => {
  class LoadUserByTokenStub implements LoadUserByToken {
    async loadByToken (accessToken: string): Promise<LoadUserByToken.Result> {
      return mockUserModel()
    }
  }
  return new LoadUserByTokenStub()
}

type SutTypes = {
  sut: AuthMiddleware
  loadUserByTokenStub: LoadUserByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadUserByTokenStub = mockLoadUserByToken()
  const sut = new AuthMiddleware(loadUserByTokenStub, role)
  return { sut, loadUserByTokenStub }
}

describe('Auth Middleware', () => {
  test('Should return 401 if no x-access-token is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ accessToken: '' })
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should call loadUserByToken with correct values', async () => {
    const role = 'any_role'
    const { sut, loadUserByTokenStub } = makeSut(role)
    const loadUserByTokenSpy = jest.spyOn(loadUserByTokenStub, 'loadByToken')
    await sut.handle({ accessToken: 'any_access_token' })
    expect(loadUserByTokenSpy).toHaveBeenCalledWith('any_access_token', role)
  })

  test('Should return 403 if loadUserByToken returns null', async () => {
    const { sut, loadUserByTokenStub } = makeSut()
    jest.spyOn(loadUserByTokenStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle({ accessToken: 'any_access_token' })
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if loadUserByToken returns an user', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ accessToken: 'any_access_token' })
    expect(httpResponse).toEqual(ok({ userId: mockUserModel().id }))
  })

  test('Should return 500 if loadUserByToken throws', async () => {
    const { sut, loadUserByTokenStub } = makeSut()
    jest.spyOn(loadUserByTokenStub, 'loadByToken').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle({ accessToken: 'any_access_token' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
