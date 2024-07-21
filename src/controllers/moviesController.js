const knex = require('../database/knex')
const AppError = require('../utils/appError')

class MovieControllers {
  async create(req, res) {
    const { name, description, note_movie, nameTag } = req.body
    const { user_id } = req.params

    const userExist = await knex('users').where({ id: user_id }).first()

    if (!userExist) throw new AppError('user undefined')

    if (!name || name.trim() === '') throw new AppError('insert name do movie!')

    if (!description || description.trim() === '')
      throw new AppError('insert description do movie!')

    if (note_movie > 5) {
      throw new AppError(
        'note_movie invalid, select options between 0 and 5 ',
        401
      )
    }

    // Inserir o filme na tabela movie_notes
    const [movie_id] = await knex('movie_notes').insert({
      name,
      description,
      note_movie,
      user_id,
    })

    if (Array.isArray(nameTag) && nameTag.length > 0) {
      const tagsToInsert = nameTag.map((tag) => ({
        name: tag,
        user_id,
        movie_id,
      }))

      await knex('movie_tags').insert(tagsToInsert)
    } else {
      throw new AppError('NameTag must be a non-empty array')
    }
    res.json({})
  }

  async show(req, res) {
    const { user_id } = req.params

    const existUser = await knex('movie_notes').where({ user_id: user_id })
    if (!user_id) throw new AppError('user not movies ')
    const moviesUser = await knex('movie_notes')
      .join('movie_tags', 'movie_notes.id', '=', 'movie_tags.movie_id')
      .select('movie_notes.*', 'movie_tags.name as tag_name')
      .where('movie_notes.user_id', user_id)
    res.json({ moviesUser })
  }

  async index(req, res) {
    const { user_id, id } = req.params

    const existUser = await knex('movie_notes').where({ user_id: user_id })
    if (!user_id) throw new AppError('user not movies ')

    const moviesUser = await knex('movie_notes')
      .join('movie_tags', 'movie_notes.id', '=', 'movie_tags.movie_id')
      .select('movie_notes.*', 'movie_tags.name as tag_name')
      .where('movie_notes.user_id', user_id)
      .andWhere('movie_notes.id', id)
      .first()
    res.json({ moviesUser })
  }

  async delete(req, res) {
    const { user_id } = req.params
    const { movie_id } = req.params

    const movies = await knex('movie_notes')
      .where({
        user_id: user_id,
        id: movie_id,
      })
      .first()
      .delete()

    if (!movies) throw new AppError('movie_id or user_id undefined')

    res.json({ message: 'deleted com success' })
  }
}

module.exports = MovieControllers
