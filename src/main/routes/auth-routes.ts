import { adaptRoute } from '@/main/adapters'
import { makeAuthenticationController, makeRegisterUserController, makeLoadUsersController } from '@/main/factories/controllers'
import { adminAuth } from '@/main/middlewares/admin-auth'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/register', adminAuth, adaptRoute(makeRegisterUserController()))
  router.post('/auth', adaptRoute(makeAuthenticationController()))
  router.get('/users', adminAuth, adaptRoute(makeLoadUsersController()))
}
