import { LoadUserByEmailRepository } from '@/data/protocols'

export const mockLoadUserByEmailRepositoryStub = (): LoadUserByEmailRepository => {
  class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
    async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
      return await Promise.resolve(mockLoadUserByEmailResult())
    }
  }
  return new LoadUserByEmailRepositoryStub()
}

export const mockLoadUserByEmailResult = (): LoadUserByEmailRepository.Result => ({
  id: 'any_id',
  email: 'any_email@mail.com',
  password: 'any_password'
})
