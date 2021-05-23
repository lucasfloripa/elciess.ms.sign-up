import { RegisterUser } from '@/domain/usecases'
import { User } from '@/domain/models'

export const mockRegisterUserParams = (): RegisterUser.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockUserModel = (): User => ({
  id: 'any_id',
  email: 'any_email',
  password: 'any_password',
  accessToken: 'any_token',
  role: 'any_role'
})

export const mockListUserModel = (): User[] => {
  return [
    mockUserModel(),
    mockUserModel()
  ]
}
