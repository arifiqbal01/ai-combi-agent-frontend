import { User } from './user.types'

export const isValidUser = (user: any): user is User => {
  return (
    user &&
    typeof user.id === 'string' &&
    typeof user.email === 'string' &&
    typeof user.role === 'string' &&
    typeof user.status === 'string' &&
    typeof user.createdAt === 'string'
  )
}