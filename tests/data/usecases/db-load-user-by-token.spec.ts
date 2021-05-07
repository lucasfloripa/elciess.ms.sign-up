import { DbLoadUserByToken } from '@/data/usecases'
import { Decrypter } from '@/data/protocols'

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
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub()
  const sut = new DbLoadUserByToken(decrypterStub)
  return { sut, decrypterStub }
}

describe('DbLoadUserByToken', () => {
  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.loadByToken('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
