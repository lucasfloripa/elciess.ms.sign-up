import { adaptRoute } from '@/main/adapters'
import { makeAuthenticationController, makeSignUpController, makeLoadUsersController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/auth', adaptRoute(makeAuthenticationController()))
  router.get('/users', adaptRoute(makeLoadUsersController()))
}
