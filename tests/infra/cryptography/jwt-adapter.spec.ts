import { JwtAdapter } from '@/infra/cryptography'

import env from '@/main/config/env'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'access_token'
  },
  async verify (): Promise<string> {
    return 'value'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter()
}

describe('Jwt Adapter', () => {
  describe('encrypt()', () => {
    test('Should call encrypt with correct values', async () => {
      const sut = makeSut()
      const encryptSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('user_id')
      expect(encryptSpy).toHaveBeenCalledWith({ id: 'user_id' }, env.jwtSecret)
    })

    test('Should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(async () => {
        throw new Error()
      })
      const promise = sut.encrypt('any_value')
      await expect(promise).rejects.toThrow()
    })

    test('Should return a access token on encrypt success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt('user_id')
      expect(accessToken).toBe('access_token')
    })
  })

  describe('decrypt()', () => {
    test('Should call decrypt with correct values', async () => {
      const sut = makeSut()
      const decryptSpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('token')
      expect(decryptSpy).toHaveBeenCalledWith('token', env.jwtSecret)
    })

    test('Should throw if verify throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(async () => {
        throw new Error()
      })
      const promise = sut.decrypt('token')
      await expect(promise).rejects.toThrow()
    })

    test('Should return a value on verify success', async () => {
      const sut = makeSut()
      const value = await sut.decrypt('token')
      expect(value).toBe('value')
    })
  })
})
