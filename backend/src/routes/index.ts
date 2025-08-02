import { Elysia } from 'elysia'
import { authRoutes } from './auth'
import { protectedRoutes } from './protected'
import {
  usersRoute,
  createUserRoute,
  getUserByIdRoute,
  updateUserRoute,
  deleteUserRoute
} from './users'

export const routes = new Elysia()

  // Öffentliche Auth-Routen
  .use(authRoutes)

  // Öffentliche User-Routen
  .get(usersRoute.path, usersRoute.handler, { response: usersRoute.schema.response })
  .post(createUserRoute.path, createUserRoute.handler, { body: createUserRoute.body })
  .get(getUserByIdRoute.path, getUserByIdRoute.handler)
  .put(updateUserRoute.path, updateUserRoute.handler, { body: updateUserRoute.body })
  .delete(deleteUserRoute.path, deleteUserRoute.handler)

  // Geschützte Routen
  .use(protectedRoutes)
