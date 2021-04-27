import { HashComparer } from '@/data/protocols'

export const mockHashComparerStub = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (hash: string, hashToCompare: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new HashComparerStub()
}
