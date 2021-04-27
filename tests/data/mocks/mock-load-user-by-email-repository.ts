import { LoadUserByEmailRepository } from '@/data/protocols'

export const mockLoadUserByEmailRepositoryStub = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
      return {
        id: 'any_id',
        email: 'any_email',
        password: 'hashed_password'
      }
    }
  }
  return new LoadUserByEmailRepositoryStub()
}
