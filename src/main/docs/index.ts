import { signUpPath } from './paths'
import { signUpSchema, signUpParamsSchema, errorSchema } from './schemas'
import { badRequest, serverError, unauthorized } from './components'

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
  tags: [{
    name: 'SignUp'
  }],
  paths: {
    '/signup': signUpPath
  },
  schemas: {
    signup: signUpSchema,
    signupParams: signUpParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized
  }
}
