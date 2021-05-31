import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'
import env from '@/main/config/env'

import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

let userCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await userCollection.insertOne({
    id: 'generated_id',
    email: 'lucasg.admin@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.ops[0].id
  const accessToken = sign({ id }, env.jwtSecret)
  await userCollection.updateOne({
    id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

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
    test('Should return 401 on register user if no accessToken is provided', async () => {
      await request(app)
        .post('/api/register')
        .send({
          email: 'lucasg.floripa@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(401)
    })

    test('Should return 403 on register user without an admin accessToken', async () => {
      await request(app)
        .post('/api/register')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWMyZjU5MWJiZDAyMDA0Mjg2YjJkYSIsImlhdCI6MTYyMTE5MDM5NX0.sNzfXcTqR1QLszyB1StjC-aCGZ4Uhe-tixs0zFUsw7I')
        .send({
          email: 'lucasg.floripa@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(403)
    })

    test('Should return 200 on register user with valid admin accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .post('/api/register')
        .set('x-access-token', accessToken)
        .send({
          email: 'juceliog@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
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

  describe('GET /users', () => {
    test('Should return 401 on get users if no accessToken is provided', async () => {
      await request(app)
        .get('/api/users')
        .expect(401)
    })

    test('Should return 403 on get users without an admin accessToken', async () => {
      await request(app)
        .get('/api/users')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWMyZjU5MWJiZDAyMDA0Mjg2YjJkYSIsImlhdCI6MTYyMTE5MDM5NX0.sNzfXcTqR1QLszyB1StjC-aCGZ4Uhe-tixs0zFUsw7I')
        .expect(403)
    })

    test('Should return 200 on get users with valid admin accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .get('/api/users')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('DELETE /delete', () => {
    test('Should return 401 on delete user if no accessToken is provided', async () => {
      await request(app)
        .delete('/api/delete')
        .send({
          id: 'any_id'
        })
        .expect(401)
    })

    test('Should return 403 on delete user without an admin accessToken', async () => {
      await request(app)
        .delete('/api/delete')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWMyZjU5MWJiZDAyMDA0Mjg2YjJkYSIsImlhdCI6MTYyMTE5MDM5NX0.sNzfXcTqR1QLszyB1StjC-aCGZ4Uhe-tixs0zFUsw7I')
        .send({
          id: 'any_id'
        })
        .expect(403)
    })

    test('Should return 200 on delete user with valid admin accessToken', async () => {
      const accessToken = await mockAccessToken()
      await userCollection.insertOne({
        id: 'any_id_to_delete',
        email: 'test@test.com',
        password: '123'
      })
      await request(app)
        .delete('/api/delete')
        .set('x-access-token', accessToken)
        .send({
          id: 'any_id_to_delete'
        })
        .expect(200)
    })
  })
})
