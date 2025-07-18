import { status, t } from 'elysia'
import { db } from '../db'
import type { Static } from '@sinclair/typebox'

/**
 * Schema for the request body to create a user.
 */
const CreateUserBody = t.Object({
  name: t.String(),
  email: t.String({ format: 'email' })
})

/**
 * Type derived from the CreateUserBody schema.
 */
type CreateUserInput = Static<typeof CreateUserBody>

/**
 * Common type for route parameters that include a numeric `id`.
 */
type ParamsWithId = {
  params: {
    id: number
  }
}

/**
 * Extended type for user update requests.
 */
type UpdateUserInput = {
  params: {
    id: number
  },
  body: Partial<CreateUserInput>
}

/**
 * GET /users
 * Fetches all users from the database.
 */
export const usersRoute = {
  path: '/users',
  handler: async () => {
    const users = await db('users').select('*')
    return users
  },
  schema: {
    response: t.Array(
      t.Object({
        id: t.Number(),
        name: t.String(),
        email: t.String(),
        created_at: t.String(),
        updated_at: t.String()
      })
    )
  }
}

/**
 * POST /users
 * Creates a new user in the database.
 */
export const createUserRoute = {
  path: '/users',
  method: 'post',
  body: CreateUserBody,
  handler: async ({ body }: { body: CreateUserInput }) => {
    const [user] = await db('users')
      .insert({
        name: body.name,
        email: body.email
      })
      .returning(['id', 'name', 'email', 'created_at', 'updated_at'])

    return user
  }
}

/**
 * GET /users/:id
 * Fetches a user by their ID.
 */
export const getUserByIdRoute = {
  path: '/users/:id',
  method: 'get',
  handler: async ({ params }: ParamsWithId) => {
    const user = await db('users').where('id', params.id).first()
    if (!user) {
      return new Response('User not found', { status: 404 })
    }
    return user
  }
}

/**
 * PUT /users/:id
 * Updates a user's information by ID.
 */
export const updateUserRoute = {
  path: '/users/:id',
  method: 'put',
  body: t.Object({
    name: t.Optional(t.String()),
    email: t.Optional(t.String({ format: 'email' }))
  }),
  handler: async ({ params, body }: UpdateUserInput) => {
    const [user] = await db('users')
      .where('id', params.id)
      .update(body)
      .returning(['id', 'name', 'email', 'created_at', 'updated_at'])

    return user ?? new Response('User not found', { status: 404 })
  }
}

/**
 * DELETE /users/:id
 * Deletes a user by ID.
 */
export const deleteUserRoute = {
  path: '/users/:id',
  method: 'delete',
  handler: async ({ params }: ParamsWithId) => {
    const result = await db('users').where('id', params.id).del()
    if (!result) {
      return new Response('User not found', { status: 404 })
    }
    return { success: true }
  }
}
