/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post("/register", "AuthController.register")
Route.post("/login", "AuthController.login")
Route.get("/foruns", "ForunsController.index")
Route.get("/foruns/:id", "ForunsController.show")
Route.get("/animes", "AnimesController.index")
Route.get("/animes/:id", "AnimesController.show")
Route.get("/animesusers", "AnimesUsersController.index")
Route.get("/animesusers/:id", "AnimesUsersController.show")
Route.group(() => {
  Route.resource("foruns", 'ForunsController').apiOnly().except(['index', 'show'])
  Route.resource("animes", 'AnimesController').apiOnly().except(['index', 'show'])
  Route.resource("animesusers", 'AnimesUsersController').apiOnly().except(['index', 'show'])
}).middleware('auth')
