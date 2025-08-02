import { z } from 'zod'

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

export const LoginSchema = RegisterSchema.omit({ name: true })

export type RegisterBody = z.infer<typeof RegisterSchema>
export type LoginBody = z.infer<typeof LoginSchema>
