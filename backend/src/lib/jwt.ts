import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret')

// 1. Signiere ein Token
export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

// 2. Verifiziere Token & liefere Payload zurück
export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, JWT_SECRET)
  return payload
}
