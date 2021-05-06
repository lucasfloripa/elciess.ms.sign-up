import { AuthMiddleware } from '@/presentation/middlewares'
import { unauthorized } from '@/presentation/helpers'

type SutTypes = {
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new AuthMiddleware()
  return { sut }
}

describe('Auth Middleware', () => {
  test('Should return 401 if no x-access-token is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ accessToken: '' })
    expect(httpResponse).toEqual(unauthorized())
  })
})
