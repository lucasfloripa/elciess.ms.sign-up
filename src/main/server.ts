/* eslint-disable import/first */
import 'module-alias/register'
import dotenv from 'dotenv'
dotenv.config({ path: './src/main/config/config.env' })

import { MongoHelper } from '@/infra/db/mongodb'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
