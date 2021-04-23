import { RegisterUserRepository } from '@/data/protocols'

export const mockRegisterUserParams = (): RegisterUserRepository.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
