import { Elysia } from 'elysia'
import { verifyToken } from '../lib/jwt'
import type { AuthenticatedUser } from '../types'

/**
 * Authentication middleware that verifies the JWT token from the Authorization header.
 * Adds the decoded user to the request context (`ctx.user`) if valid.
 */
export const auth = new Elysia()
  .derive(() => ({} as { store: { user: AuthenticatedUser } }))
  .derive(async ({ headers, set }) => {
    const token = headers.authorization?.replace('Bearer ', '')

    if (!token) {
      set.status = 401
      throw new Error('Missing token')
    }

    try {
      const payload = await verifyToken(token)

      return {
        user: payload as AuthenticatedUser
      }
    } catch {
      set.status = 401
      throw new Error('Invalid or expired token')
    }
  })
