import { CheckUserByEmailRepository } from '@/data/protocols'

export const mockCheckUserByEmailRepositoryStub = (): CheckUserByEmailRepository => {
  class CheckUserByEmailRepositoryStub implements CheckUserByEmailRepository {
    async checkByEmail (email: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new CheckUserByEmailRepositoryStub()
}
