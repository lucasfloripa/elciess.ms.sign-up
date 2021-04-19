import { LoadUserByEmailRepository } from '@/data/protocols'

export const mockLoadUserByEmailRepositoryStub = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
      return await Promise.resolve({
        id: 'any_id',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
    }
  }
  return new LoadUserByEmailRepositoryStub()
}
