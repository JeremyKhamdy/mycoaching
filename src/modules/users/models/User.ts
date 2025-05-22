export interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  status: 'active' | 'inactive'
  avatar?: string
  createdAt?: string
  updatedAt?: string
}
