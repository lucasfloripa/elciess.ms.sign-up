import { signUpPath, authPath } from './paths'
import { signUpSchema, signUpParamsSchema, authSchema, authParamsSchema, errorSchema } from './schemas'
import { badRequest, serverError, forbidden, unauthorized } from './components'

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
    { name: 'Auth' }
  ],
  paths: {
    '/signup': signUpPath,
    '/auth': authPath
  },
  schemas: {
    signup: signUpSchema,
    signupParams: signUpParamsSchema,
    auth: authSchema,
    authParams: authParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    forbidden,
    unauthorized
  }
}
