import { RegisterUserRepository, CheckUserByEmailRepository, LoadUserByEmailRepository, UpdateUserAccessTokenRepository, LoadUsersRepository, LoadUserByIdRepository, DeleteUserByIdRepository } from '@/data/protocols'
import { MongoHelper } from './mongo-helper'

export class UserMongoRepository implements RegisterUserRepository, CheckUserByEmailRepository, LoadUserByEmailRepository, UpdateUserAccessTokenRepository, LoadUsersRepository, LoadUserByIdRepository, DeleteUserByIdRepository {
  async register (data: RegisterUserRepository.Params): Promise<boolean> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne(data)
    return result.ops[0] !== null
  }

  async checkByEmail (email: string): Promise<boolean> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne(
      { email },
      {
        projection: {
          _id: 1
        }
      }
    )
    return user !== null
  }

  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    return await userCollection.findOne({ email }, { projection: { _id: 0 } })
  }

  async loadById (id: string): Promise<LoadUserByIdRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    return await userCollection.findOne({ id }, { projection: { _id: 0 } })
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.findOneAndUpdate(
      { id },
      {
        $set: {
          accessToken: token
        }
      })
  }

  async loadAll (): Promise<LoadUsersRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    return await userCollection.find({}, { projection: { _id: 0 } }).toArray()
  }

  async deleteById (userId: string): Promise<boolean> {
    const userCollection = await MongoHelper.getCollection('users')
    const wasDeleted = await userCollection.deleteOne({ id: userId })
    if (wasDeleted.deletedCount === 1) {
      return true
    } else {
      return false
    }
  }
}
