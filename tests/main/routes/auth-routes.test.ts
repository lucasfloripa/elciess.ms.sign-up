import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
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

  describe('POST /register', () => {
    test('Should return 200 on register user', async () => {
      await request(app)
        .post('/api/register')
        .send({
          email: 'lucasgoncalves@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })

    test('Should return 400 on register user if validation fails', async () => {
      await request(app)
        .post('/api/register')
        .send({
          email: 'lucasgoncalves@gmail.com',
          password: '123',
          passwordConfirmation: '1234'
        })
        .expect(400)
    })

    test('Should return 403 on register user if try register with email already used', async () => {
      await request(app)
        .post('/api/register')
        .send({
          email: 'lucasgoncalves@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
      await request(app)
        .post('/api/register')
        .send({
          email: 'lucasgoncalves@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(403)
    })
  })

  describe('POST /auth', () => {
    test('Should return 200 on auth', async () => {
      const password = await hash('123', 12)
      await userCollection.insertOne({
        email: 'lucasg@gmail.com',
        password
      })
      await request(app)
        .post('/api/auth')
        .send({
          email: 'lucasg@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 400 on auth if validation fails', async () => {
      await request(app)
        .post('/api/auth')
        .send({
          email: 'lucasgoncalves@gmail.com'
        })
        .expect(400)
    })

    test('Should return 401 on auth fail', async () => {
      await request(app)
        .post('/api/auth')
        .send({
          email: 'lucasg@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
