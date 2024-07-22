const knex = require('../database/knex')
const AppError = require('../utils/appError')
const { hash, compare } = require('bcryptjs')

const UseRepository = require('../repositories/UseRepository')
const UseCreateService = require('../services/UseCreateService')
class UsersController {
  async created(req, res) {
    const { name, email, password } = req.body
    const useRepository = new UseRepository({})
    const useCreateService = new UseCreateService(useRepository)

    await useCreateService.execute({ name, email, password })

    return res.status(201).json()
  }

  async show(req, res) {
    const { id } = req.params

    const user = await knex('users').where({ id }).first()
    if (!user) throw new AppError('user undefined')

    return res.json({
      user,
    })
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body
    const { id } = req.params

    const user = await knex('users').where({ id: id }).first()

    if (name && name !== user.name) {
      await knex('users').where({ id: id }).update({ name })
    }

    if (email && email !== user.email) {
      const emailVerify = await knex('users')
        .where({ id: id, email: email })
        .first()

      if (!emailVerify) throw new AppError('email incorrect')

      await knex('users').where({ id: id }).update({ email })
    }

    if (old_password && password) {
      const checkHashPassword = await compare(old_password, user.password)

      if (!checkHashPassword) {
        throw new AppError('password incorrect!')
      }

      const newPassword = await hash(password, 8)
      console.log(newPassword)
      await knex('users').where({ id: id }).update({
        password: newPassword,
      })

      await knex('users').where({ id: id }).update({
        name,
      })
    }

    res.json({ user })
  }

  async delete(req, res) {
    const { email, password } = req.body

    const { id } = req.params

    const user = await knex('users').where({ id: id }).first()
    if (!user) throw new AppError('id not exist')

    const userVerify = await await knex('users')
      .where({ email: email, password: password })
      .first()

    const passwordVerify = compare(password, user.password)
    if (!userVerify && !passwordVerify)
      throw new AppError('email or password invalid')

    await knex('users').where({ email: email }).delete()

    res.json({ message: 'user deleted' })
  }
}

module.exports = UsersController
