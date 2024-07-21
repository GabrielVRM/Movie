const { Router } = require('express')

const userRouters = require('./users.routes')
const movieRoutes = require('./movies.routes')
const sessionRoutes = require('./sessions.routes')

const routes = Router()

routes.use('/user', userRouters)
routes.use('/movie', movieRoutes)
routes.use('/session', sessionRoutes)

module.exports = routes
