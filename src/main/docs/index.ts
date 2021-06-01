import { registerUserPath, authPath, usersPath, deleteUserPath } from './paths'
import { registerUserSchema, registerUserParamsSchema, authSchema, authParamsSchema, errorSchema, usersSchema, noContentSchema, deleteUserParamsSchema } from './schemas'
import { badRequestResponse, serverErrorResponse, forbiddenResponse, unauthorizedResponse, noContentResponse, notFoundResponse } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Elciess User-Controll API',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [
    { name: 'Auth' },
    { name: 'Get Users' },
    { name: 'Register User' },
    { name: 'Delete User' }
  ],
  paths: {
    '/auth': authPath,
    '/register': registerUserPath,
    '/delete': deleteUserPath,
    '/users': usersPath
  },
  schemas: {
    registerUser: registerUserSchema,
    registerUserParams: registerUserParamsSchema,
    deleteUser: registerUserSchema,
    deleteUserParams: deleteUserParamsSchema,
    auth: authSchema,
    authParams: authParamsSchema,
    users: usersSchema,
    error: errorSchema,
    noContent: noContentSchema
  },
  components: {
    noContentResponse,
    notFoundResponse,
    badRequestResponse,
    serverErrorResponse,
    forbiddenResponse,
    unauthorizedResponse
  }
}
