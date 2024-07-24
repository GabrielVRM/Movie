const knex = require('../database/knex/index')
const AppError = require('../utils/appError')

class UseRepository {
  async findByEmail(email) {
    try {
      const user = await knex('users').where(email).first()

      console.log(user)
      return user
    } catch (error) {
      throw new AppError(`${error}, email já existente`)
    }
  }

  async create({ name, email, password }) {
    console.log({ name, email, password })
    try {
      const userId = await knex('users').insert({
        name,
        email,
        password,
      })

      return { id: userId }
    } catch (error) {
      throw new AppError(`${error}, não foi possivel cadastrar!`)
    }
  }
}

module.exports = UseRepository
