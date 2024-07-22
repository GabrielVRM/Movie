const knex = require('../database/knex/index')

class UseRepository {
  async findByEmail(email) {
    const user = await knex('users').where({ email: email }).first()

    return user
  }

  async create({ name, email, hashedPassword }) {
    const userId = await knex('users').insert({
      name,
      email,
      password: hashedPassword,
    })

    return { id: userId }
  }
}

module.exports = UseRepository
