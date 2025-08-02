import { Elysia, t, type Static } from 'elysia'
import bcrypt from 'bcryptjs'
import { db } from '../lib/db'

const RegisterBody = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6 })
})
type RegisterInput = Static<typeof RegisterBody>

const LoginBody = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String()
})
type LoginInput = Static<typeof LoginBody>

export const authRoutes = new Elysia()

  .post('/auth/register', async ({ body, set }) => {
    const input = body as RegisterInput
    const existing = await db('auth_users').where('email', input.email).first()
    if (existing) {
      set.status = 409
      return { error: 'Email already exists' }
    }

    const hash = await bcrypt.hash(input.password, 10)

    const [user] = await db('auth_users')
      .insert({ email: input.email, password_hash: hash })
      .returning(['id', 'email', 'created_at'])

    return user
  }, { body: RegisterBody })

  .post('/auth/login', async ({ body, set }) => {
    const input = body as LoginInput
    const user = await db('auth_users').where('email', input.email).first()

    if (!user || !(await bcrypt.compare(input.password, user.password_hash))) {
      set.status = 401
      return { error: 'Invalid credentials' }
    }

    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at
    }
  }, { body: LoginBody })
