import { UserMongoRepository } from '@/infra/db/mongodb'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { mockRegisterUserRepositoryParams } from '@/tests/data/mocks'

import { Collection } from 'mongodb'

const makeSut = (): UserMongoRepository => {
  return new UserMongoRepository()
}

let userCollection: Collection

describe('UserMongo Repository', () => {
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
      const isValid = await sut.register(mockRegisterUserRepositoryParams())
      expect(isValid).toBeTruthy()
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if the user was found', async () => {
      const sut = makeSut()
      const registerUserParams = mockRegisterUserRepositoryParams()
      await userCollection.insertOne(registerUserParams)
      const exist = await sut.checkByEmail(registerUserParams.email)
      expect(exist).toBeTruthy()
    })

    test('Should return false if the user was not found', async () => {
      const sut = makeSut()
      const exist = await sut.checkByEmail('any_email@mail.com')
      expect(exist).toBeFalsy()
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const registerUserParams = mockRegisterUserRepositoryParams()
      await userCollection.insertOne(registerUserParams)
      const user = await sut.loadByEmail(registerUserParams.email)
      expect(user).toBeTruthy()
      expect(user.email).toBe(registerUserParams.email)
    })

    test('Should return null if the user was not found', async () => {
      const sut = makeSut()
      const exist = await sut.loadByEmail('invalid_email@mail.com')
      expect(exist).toBeNull()
    })
  })

  describe('loadById()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const registerUserParams = mockRegisterUserRepositoryParams()
      await userCollection.insertOne(registerUserParams)
      const exist = await sut.loadById(registerUserParams.id)
      expect(exist).toBeTruthy()
      expect(exist.id).toBe(registerUserParams.id)
    })

    test('Should return null if user was not found', async () => {
      const sut = makeSut()
      const exist = await sut.loadById('invalid_id')
      expect(exist).toBeNull()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update user accessToken on success', async () => {
      const sut = makeSut()
      const res = await userCollection.insertOne(mockRegisterUserRepositoryParams())
      const fakeAccount = res.ops[0]
      expect(fakeAccount.accessToken).toBeFalsy()
      const accessToken = 'any_access_token'
      await sut.updateAccessToken(fakeAccount.id, accessToken)
      const account = await userCollection.findOne({ id: fakeAccount.id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })

  describe('loadAll()', () => {
    test('Should return an list of users on success', async () => {
      const sut = makeSut()
      const registerUserParams = mockRegisterUserRepositoryParams()
      await userCollection.insertOne(registerUserParams)
      await userCollection.insertOne({
        id: 'generated_id2',
        email: 'any_email2@mail.com',
        password: 'any_password2'
      })
      const users = await sut.loadAll()
      expect(users[0]).toBeTruthy()
      expect(users[1]).toBeTruthy()
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const users = await sut.loadAll()
      expect(users.length).toBe(0)
    })
  })

  describe('deleteById()', () => {
    test('Should delete an user on success', async () => {
      const sut = makeSut()
      const registerUserParams = mockRegisterUserRepositoryParams()
      await userCollection.insertOne(registerUserParams)
      const wasDeleted = await sut.deleteById(registerUserParams.id)
      expect(wasDeleted).toBeTruthy()
    })
  })
})
