import { DbLoadUserByToken } from '@/data/usecases'
import { Decrypter, LoadUserByTokenRepository } from '@/data/protocols'
import { User } from '@/domain/models'
import { mockUserModel } from '@/tests/domain/mocks'

const makeLoadUserByTokenRepositoryStub = (): LoadUserByTokenRepository => {
  class LoadUserByTokenRepositoryStub implements LoadUserByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<User> {
      return mockUserModel()
    }
  }
  return new LoadUserByTokenRepositoryStub()
}

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (text: string): Promise<string> {
      return 'valid_decrypt'
    }
  }
  return new DecrypterStub()
}

type SutTypes = {
  sut: DbLoadUserByToken
  decrypterStub: Decrypter
  loadUserByTokenRepositoryStub: LoadUserByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const loadUserByTokenRepositoryStub = makeLoadUserByTokenRepositoryStub()
  const sut = new DbLoadUserByToken(decrypterStub, loadUserByTokenRepositoryStub)
  return { sut, decrypterStub, loadUserByTokenRepositoryStub }
}

describe('DbLoadUserByToken', () => {
  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.loadByToken('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const user = await sut.loadByToken('any_token', 'any_role')
    expect(user).toBe(null)
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(async () => await Promise.reject(new Error()))
    const promise = sut.loadByToken('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  test('Should call loadUserByTokenRepository with correct value', async () => {
    const { sut, loadUserByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadUserByTokenRepositoryStub, 'loadByToken')
    await sut.loadByToken('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('valid_decrypt', 'any_role')
  })

  test('Should return null if loadUserByTokenRepository returns null', async () => {
    const { sut, loadUserByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadUserByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const user = await sut.loadByToken('any_token', 'any_role')
    expect(user).toBe(null)
  })
})
