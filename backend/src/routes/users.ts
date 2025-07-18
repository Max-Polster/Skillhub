import { t } from 'elysia'
import { db } from '../db'
import type { Static } from '@sinclair/typebox'

const CreateUserBody = t.Object({
  name: t.String(),
  email: t.String({ format: 'email' })
})

type CreateUserInput = Static<typeof CreateUserBody>


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
        updated_at: t.String(),
      })
    )
  }
}

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

