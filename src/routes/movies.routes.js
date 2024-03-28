const { Router } = require("express");
const movieRoutes = Router()
const MovieControllers = require("../controllers/moviesController")

const movieControllers = new MovieControllers()


movieRoutes.post("/:user_id", movieControllers.create)



module.exports = movieRoutes;
