import { IdGenerator } from '@/data/protocols'

import uuid from 'uuid'

export class UuidAdapter implements IdGenerator {
  async generate (): Promise<string> {
    return uuid.v4()
  }
}
