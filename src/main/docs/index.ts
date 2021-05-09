import { registerUserPath, authPath, usersPath } from './paths'
import { registerUserSchema, registerUserParamsSchema, authSchema, authParamsSchema, errorSchema, usersSchema, noContentSchema } from './schemas'
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
    { name: 'RegisterUser' },
    { name: 'Auth' },
    { name: 'Get Users' }
  ],
  paths: {
    '/register': registerUserPath,
    '/auth': authPath,
    '/users': usersPath
  },
  schemas: {
    registerUser: registerUserSchema,
    registerUserParams: registerUserParamsSchema,
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
