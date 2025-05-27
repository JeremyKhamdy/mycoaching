import type { UUID } from 'crypto'
import type { Health } from './Health'

export enum EnumGender {
  male = 'male',
  female = 'female'
}
export interface Account {
  id: number
  user_id: UUID
  firstname: string
  lastname: string
  email: string
  password: string
  height: number
  gender: EnumGender | null
  birthday: Date | string
  createdAt?: string
  updatedAt?: string
  health: Health
}
