import { signUpPath, authPath, usersPath } from './paths'
import { signUpSchema, signUpParamsSchema, authSchema, authParamsSchema, errorSchema, usersSchema, noContentSchema } from './schemas'
import { badRequestResponse, serverErrorResponse, forbiddenResponse, unauthorizedResponse, noContentResponse } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Elciess Auth-Controll API',
    description: 'API to register users and to authenticate them in any other Elciess service.',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [
    { name: 'SignUp' },
    { name: 'Auth' },
    { name: 'Get Users' }
  ],
  paths: {
    '/signup': signUpPath,
    '/auth': authPath,
    '/users': usersPath
  },
  schemas: {
    signup: signUpSchema,
    signupParams: signUpParamsSchema,
    auth: authSchema,
    authParams: authParamsSchema,
    users: usersSchema,
    error: errorSchema,
    noContent: noContentSchema
  },
  components: {
    noContentResponse,
    badRequestResponse,
    serverErrorResponse,
    forbiddenResponse,
    unauthorizedResponse
  }
}
