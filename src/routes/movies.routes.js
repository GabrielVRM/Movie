const { Router } = require("express");
const movieRoutes = Router();
const MovieControllers = require("../controllers/moviesController");

const movieControllers = new MovieControllers();

movieRoutes.post("/:user_id", movieControllers.create);
movieRoutes.get("/:user_id", movieControllers.show);
movieRoutes.delete("/:user_id/:movie_id", movieControllers.delete);

module.exports = movieRoutes;
