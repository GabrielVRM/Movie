const knex = require('../database/knex')
const authConfig = require('../config/auth')
const { sign } = require('jsonwebtoken')
const AppError = require('../utils/appError')

const { compare } = require('bcryptjs')

class SessionController {
  async create(req, res) {
    const { email, password } = req.body
    console.log({ email, password })

    const user = await knex('users').where({ email }).first()
    if (!user) {
      throw new AppError('E-mail ou senha invalida', 401)
    }

    console.log(password, user.password)
    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) {
      throw new AppError('E-mail ou senha invalida', 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    })

    return res.json({ user, token })
  }
}

module.exports = SessionController
