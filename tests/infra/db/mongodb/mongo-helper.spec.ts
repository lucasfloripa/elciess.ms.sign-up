import { MongoHelper as sut } from '@/infra/db/mongodb'
import { mockRegisterUserRepositoryParams } from '@/tests/data/mocks'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('users')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('users')
    expect(accountCollection).toBeTruthy()
  })

  test('Should map an object without _id', async () => {
    const map = await sut.map({ _id: 'any_id', ...mockRegisterUserRepositoryParams() })
    expect(map).toEqual(mockRegisterUserRepositoryParams())
  })

  test('Should map all objects without _id', async () => {
    const mapAll = sut.mapCollection([
      { _id: 'any_id', ...mockRegisterUserRepositoryParams() },
      { _id: 'any_id', ...mockRegisterUserRepositoryParams() }
    ])
    expect(mapAll).toEqual([
      mockRegisterUserRepositoryParams(),
      mockRegisterUserRepositoryParams()
    ])
  })
})
