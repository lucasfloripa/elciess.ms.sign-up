import { adaptRoute } from '@/main/adapters'
import { makeRegisterUserController, makeLoadUsersController, makeDeleteUserController } from '@/main/factories/controllers'
import { adminAuth } from '@/main/middlewares/admin-auth'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/register', adminAuth, adaptRoute(makeRegisterUserController()))
  router.get('/users', adminAuth, adaptRoute(makeLoadUsersController()))
  router.delete('/delete', adminAuth, adaptRoute(makeDeleteUserController()))
}
