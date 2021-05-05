import { User } from '@/domain/models'

export interface LoadUsers {
  load: () => Promise<User[]>
}
