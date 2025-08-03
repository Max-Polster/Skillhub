import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { routes } from './routes'

const app = new Elysia()
  .use(swagger())  // <- Swagger aktivieren
  .use(routes)     // <- Routen einbinden

app.listen(3000)

console.log('🚀 Server läuft auf http://localhost:3000')
console.log('📘 Swagger UI: http://localhost:3000/swagger')
