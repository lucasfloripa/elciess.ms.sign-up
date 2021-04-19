import { Hasher } from '@/data/protocols'

export const mockHasherStub = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (plaintext: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}
