/**

@file Defines the authentication routes: user registration and login.

Uses bcryptjs for password hashing and elysia for route definition & validation.
*/
import type { Static } from '@sinclair/typebox'

import { t } from 'elysia'
import { db } from '../db'
import bcrypt from 'bcryptjs'


/**
 * Schema for user registration body
 * @typedef {Object} RegisterBody
 * @property {string} email - User's email address
 * @property {string} password - User's password (minimum 6 characters)
 */
const RegisterBody = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6 })
})
type RegisterInput = Static<typeof RegisterBody>
type LoginInput = Static<typeof LoginBody>
/**
 * Schema for user login body
 * @typedef {Object} LoginBody
 * @property {string} email - User's email address
 * @property {string} password - User's password
 */
const LoginBody = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String()
})

/**
 * POST /auth/register  
 * Registers a new user. Hashes the password before storing it.  
 * Returns the created user's ID, email, and creation timestamp.
 */
export const registerRoute = {
  path: '/auth/register',
  method: 'post',
  body: RegisterBody,
  handler: async ({ body }: { body: RegisterInput }) => {

    const existing = await db('auth_users').where('email', body.email).first()
    if (existing) {
      return new Response('Email already exists', { status: 409 })
    }

    const hash = await bcrypt.hash(body.password, 10)

    const [user] = await db('auth_users')
      .insert({ email: body.email, password_hash: hash })
      .returning(['id', 'email', 'created_at'])

    return user
  }
}

/**
 * POST /auth/login  
 * Verifies a user's credentials.  
 * Returns user data on success, or a 401 error on failure.
 */
export const loginRoute = {
  path: '/auth/login',
  method: 'post',
  body: LoginBody,
  handler: async ({ body }: { body: LoginInput }) => {

    const user = await db('auth_users')
      .where('email', body.email)
      .first()

    if (!user) {
      return new Response('Invalid credentials', { status: 401 })
    }

    const valid = await bcrypt.compare(body.password, user.password_hash)

    if (!valid) {
      return new Response('Invalid credentials', { status: 401 })
    }

    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at
    }
  }
}