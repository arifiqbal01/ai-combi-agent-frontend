import { User } from './user.types'

// -----------------------------
// Display Helpers
// -----------------------------
export const getUserDisplayName = (user: User) => {
  return user.name || user.email
}

// -----------------------------
// Status Helpers
// -----------------------------
export const isUserActive = (user: User) =>
  user.status === 'active'

export const isUserInvited = (user: User) =>
  user.status === 'invited'

export const isUserDisabled = (user: User) =>
  user.status === 'disabled'

// -----------------------------
// Role Helpers
// -----------------------------
export const isOwner = (user: User) =>
  user.role === 'owner'

export const isAdmin = (user: User) =>
  user.role === 'admin'

export const isAgent = (user: User) =>
  user.role === 'agent'

export const isViewer = (user: User) =>
  user.role === 'viewer'

// -----------------------------
// UI Decisions (CRITICAL)
// -----------------------------
export const canBeModified = (user: User) => {
  // Owner is immutable
  return user.role !== 'owner'
}

export const canBeDeleted = (user: User) => {
  // Owner cannot be deleted
  return user.role !== 'owner'
}