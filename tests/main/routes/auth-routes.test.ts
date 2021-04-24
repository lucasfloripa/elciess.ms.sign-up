import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'

import { Collection } from 'mongodb'
import request from 'supertest'

let userCollection: Collection

describe('Auth Routes', () => {
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

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          email: 'lucasgoncalves@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })

    test('Should return 400 on signup if validation fails', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          email: 'lucasgoncalves@gmail.com',
          password: '123',
          passwordConfirmation: '1234'
        })
        .expect(400)
    })

    test('Should return 403 on signup if try register with email already used', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          email: 'lucasgoncalves@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
      await request(app)
        .post('/api/signup')
        .send({
          email: 'lucasgoncalves@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(403)
    })
  })
})
