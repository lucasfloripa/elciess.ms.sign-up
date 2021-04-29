import { JwtAdapter } from '@/infra/cryptography'
import env from '@/main/config/env'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'valid_access_token'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter()
}

describe('JwtAdapter', () => {
  describe('encrypt()', () => {
    test('Should call encrypt with correct values', async () => {
      const sut = makeSut()
      const encryptSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('user_id')
      expect(encryptSpy).toHaveBeenCalledWith('user_id', env.jwtSecret)
    })
  })
})
