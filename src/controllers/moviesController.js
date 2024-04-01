const knex = require("../database/knex");
const AppError = require("../utils/appError");

class MovieControllers {
  async create(req, res) {
    const { name, description, note_movie, nameTag } = req.body;
    const { user_id } = req.params;

    const userExist = await knex("users").where({ id: user_id }).first();

    if (!userExist) throw new AppError("user undefined");

    const [movie_id] = await knex("movie_notes").insert({
      name,
      description,
      note_movie,
      user_id,
    });

    const MovieTag = await knex("movie_tags").insert({
      name: nameTag,
      user_id,
      movie_id,
    });

    res.json({});
  }

  async show(req, res) {
    const { user_id } = req.params;

    const existUser = await knex("movie_notes").where({ user_id: user_id });
    if (!user_id) throw new AppError("user not movies ");
    const moviesUser = await knex("movie_notes").where({
      user_id: user_id,
    });
    res.json({ moviesUser });
  }

  async delete(req, res) {
    const { user_id } = req.params;
    const { movie_id } = req.params;

    const movies = await knex("movie_notes")
      .where({
        user_id: user_id,
        id: movie_id,
      })
      .first()
      .delete();

    if (!movies) throw new AppError("movie_id or user_id undefined");

    res.json({ message: "deleted com success" });
  }
}

module.exports = MovieControllers;
