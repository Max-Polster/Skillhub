// src/routes/protected.ts
import { Elysia } from 'elysia'
import { auth } from '../middleware/auth'
import type { AuthenticatedUser } from '../types'

export const protectedRoutes = new Elysia()
  .use(auth)
  .get('/me', ({ store }: { store: { user: AuthenticatedUser } }) => {
    return {
      message: 'You are authenticated!',
      user: store.user
    }
  })
