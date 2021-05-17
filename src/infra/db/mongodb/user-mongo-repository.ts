import { RegisterUserRepository, CheckUserByEmailRepository, LoadUserByEmailRepository, UpdateUserAccessTokenRepository, LoadUsersRepository, LoadUserByIdRepository } from '@/data/protocols'
import { User } from '@/domain/models'
import { MongoHelper } from './mongo-helper'
import { ObjectId } from 'mongodb'

export class UserMongoRepository implements RegisterUserRepository, CheckUserByEmailRepository, LoadUserByEmailRepository, UpdateUserAccessTokenRepository, LoadUsersRepository, LoadUserByIdRepository {
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
    const user = await userCollection.findOne({ email })
    return user && MongoHelper.map(user)
  }

  async loadById (id: string): Promise<User> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({ _id: new ObjectId(id) })
    return user && MongoHelper.map(user)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')
    await userCollection.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          accessToken: token
        }
      })
  }

  async loadAll (): Promise<LoadUsersRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    const users = await userCollection.find().toArray()
    return users && MongoHelper.mapCollection(users)
  }
}
