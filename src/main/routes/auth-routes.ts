import { adaptRoute } from '@/main/adapters'
import { makeAuthenticationController, makeRegisterUserController, makeLoadUsersController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/register', adaptRoute(makeRegisterUserController()))
  router.post('/auth', adaptRoute(makeAuthenticationController()))
  router.get('/users', adaptRoute(makeLoadUsersController()))
}
