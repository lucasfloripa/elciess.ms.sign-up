import { AuthRoleMiddleware } from '@/presentation/middlewares'
import { forbidden, ok, serverError, unauthorized } from '@/presentation/helpers'
import { AccessDeniedError } from '@/presentation/errors'
import { RoleAuthentication } from '@/domain/usecases'
import { User } from '@/domain/models'
import { mockUserModel } from '@/tests/domain/mocks'

const makeRoleAuthenticationStub = (): RoleAuthentication => {
  class RoleAuthenticationStub implements RoleAuthentication {
    async auth (token: string, role: string): Promise<User> {
      return mockUserModel()
    }
  }
  return new RoleAuthenticationStub()
}

type SutTypes = {
  sut: AuthRoleMiddleware
  roleAuthenticationStub: RoleAuthentication
}

const makeSut = (): SutTypes => {
  const role = 'any_role'
  const roleAuthenticationStub = makeRoleAuthenticationStub()
  const sut = new AuthRoleMiddleware(roleAuthenticationStub, role)
  return { sut, roleAuthenticationStub }
}

describe('AuthRoleMiddleware ', () => {
  test('Should return 401 if no x-access-token is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ accessToken: '' })
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should call RoleAuthentication with correct values', async () => {
    const { sut, roleAuthenticationStub } = makeSut()
    const authSpy = jest.spyOn(roleAuthenticationStub, 'auth')
    await sut.handle({ accessToken: 'any_access_token' })
    expect(authSpy).toHaveBeenCalledWith('any_access_token', 'any_role')
  })

  test('Should return 403 if RoleAuthentication returns null', async () => {
    const { sut, roleAuthenticationStub } = makeSut()
    jest.spyOn(roleAuthenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle({ accessToken: 'any_access_token' })
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if RoleAuthentication returns an user', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ accessToken: 'any_access_token' })
    expect(httpResponse).toEqual(ok({ userId: mockUserModel().id }))
  })

  test('Should return 500 if RoleAuthentication throws', async () => {
    const { sut, roleAuthenticationStub } = makeSut()
    jest.spyOn(roleAuthenticationStub, 'auth').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const httpResponse = await sut.handle({ accessToken: 'any_access_token' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
