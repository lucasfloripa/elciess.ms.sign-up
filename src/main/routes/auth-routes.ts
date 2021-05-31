import { adaptRoute } from '@/main/adapters'
import { makeAuthenticationController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/auth', adaptRoute(makeAuthenticationController()))
}
