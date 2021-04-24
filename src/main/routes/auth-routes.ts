import { adaptRoute } from '@/main/adapters'
import { makeSignUpController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
