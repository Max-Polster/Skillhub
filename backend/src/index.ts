import { Elysia } from 'elysia'
import {
  usersRoute,
  createUserRoute,
  getUserByIdRoute,
  updateUserRoute,
  deleteUserRoute
} from './routes/users'
import { protectedRoutes } from './routes/protected'


const app = new Elysia()

app
  .get(usersRoute.path, usersRoute.handler, { response: usersRoute.schema.response })
  .post(createUserRoute.path, createUserRoute.handler, { body: createUserRoute.body })
  .get(getUserByIdRoute.path, getUserByIdRoute.handler)
  .put(updateUserRoute.path, updateUserRoute.handler, { body: updateUserRoute.body })
  .delete(deleteUserRoute.path, deleteUserRoute.handler)
  .use(protectedRoutes) 

app.listen(3000)
console.log('🚀 Server läuft auf http://localhost:3000')
