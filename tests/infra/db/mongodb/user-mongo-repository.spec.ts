import { UserMongoRepository } from '@/infra/db/mongodb'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { mockRegisterUserParams } from '@/tests/infra/mocks'
import { Collection } from 'mongodb'

const makeSut = (): UserMongoRepository => {
  return new UserMongoRepository()
}

let userCollection: Collection

describe('UserMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('register()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const isValid = await sut.register(mockRegisterUserParams())
      expect(isValid).toBe(true)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if the user was found', async () => {
      const sut = makeSut()
      const registerUserParams = mockRegisterUserParams()
      await userCollection.insertOne(registerUserParams)
      const exist = await sut.checkByEmail(registerUserParams.email)
      expect(exist).toBe(true)
    })

    test('Should return false if the user was not found', async () => {
      const sut = makeSut()
      const exist = await sut.checkByEmail('any_email@mail.com')
      expect(exist).toBe(false)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const registerUserParams = mockRegisterUserParams()
      await userCollection.insertOne(registerUserParams)
      const user = await sut.loadByEmail(registerUserParams.email)
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
      expect(user.email).toBe(registerUserParams.email)
      expect(user.password).toBe(registerUserParams.password)
    })

    test('Should return null if the user was not found', async () => {
      const sut = makeSut()
      const exist = await sut.loadByEmail('any_email@mail.com')
      expect(exist).toBe(null)
    })
  })
})
