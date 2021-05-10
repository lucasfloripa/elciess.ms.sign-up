import { adaptMiddleware } from '@/main/adapters'
import { makeAuthAdminMiddleware } from '@/main/factories/middlewares'

export const adminAuth = adaptMiddleware(makeAuthAdminMiddleware())
