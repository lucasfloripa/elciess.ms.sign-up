import { RegisterUser } from '@/domain/usecases'

export const mockRegisterUserParams = (): RegisterUser.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
