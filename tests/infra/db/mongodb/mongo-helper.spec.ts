import { MongoHelper as sut } from '@/infra/db/mongodb'

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

  test('Should map an object with _id to id', async () => {
    const map = await sut.map({ _id: 'id' })
    expect(map).toEqual({ id: 'id' })
  })

  test('Should map all objects with _id to id of an collection', async () => {
    const map = sut.mapCollection([
      { _id: 'id' },
      { _id: 'id' }
    ])
    expect(map).toEqual([
      { id: 'id' },
      { id: 'id' }
    ])
  })
})
