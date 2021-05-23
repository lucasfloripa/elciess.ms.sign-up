import { Decrypter } from '@/data/protocols'

export const mockDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (text: string): Promise<any> {
      return { id: 'any_id' }
    }
  }
  return new DecrypterStub()
}
