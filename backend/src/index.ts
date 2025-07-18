import { Elysia } from 'elysia'
import { usersRoute, createUserRoute } from './routes/users'

const app = new Elysia()

app.get(usersRoute.path, usersRoute.handler, {
  response: usersRoute.schema.response
})

app.post(createUserRoute.path, createUserRoute.handler, {
  body: createUserRoute.body
})

app.listen(3000)
console.log('🚀 Server läuft auf http://localhost:3000')
