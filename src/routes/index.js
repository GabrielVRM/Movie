const { Router } = require("express")

const userRouters = require("./users.routes")
const movieRoutes = require("./movies.routes")


const routes = Router()

routes.use("/user", userRouters);
routes.use("/movie", movieRoutes)


module.exports = routes;