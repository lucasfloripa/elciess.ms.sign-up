import { UserMongoRepository } from '@/infra/db/mongodb'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { mockRegisterUserParams } from '@/tests/infra/mocks'
import { Collection } from 'mongodb'

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
      const isValid = await sut.register(mockRegisterUserParams())
      expect(isValid).toBe(true)
    })
  })
})
