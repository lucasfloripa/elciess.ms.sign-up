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
})
