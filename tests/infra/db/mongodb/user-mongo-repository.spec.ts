import { UserMongoRepository } from '@/infra/db/mongodb'
import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

const makeSut = (): UserMongoRepository => {
  return new UserMongoRepository()
}

let accountCollection: Collection

describe('UserMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('register()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const isValid = await sut.register({
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(isValid).toBe(true)
    })
  })
})
