import { UuidAdapter } from '@/infra/generators'

import uuid from 'uuid'

jest.mock('uuid', () => ({
  async v4 (): Promise<string> {
    return 'v4_id'
  }
}))

const makeSut = (): UuidAdapter => {
  return new UuidAdapter()
}

describe('Uuid Adapter', () => {
  test('Should call generate correctly', async () => {
    const sut = makeSut()
    const generateSpy = jest.spyOn(uuid, 'v4')
    await sut.generate()
    expect(generateSpy).toHaveBeenCalled()
  })

  test('Should throw if generate throws', async () => {
    const sut = makeSut()
    jest.spyOn(uuid, 'v4').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.generate()
    await expect(promise).rejects.toThrow()
  })

  test('Should return a v4 uuid on generate success', async () => {
    const sut = makeSut()
    const accessToken = await sut.generate()
    expect(accessToken).toBe('v4_id')
  })
})
