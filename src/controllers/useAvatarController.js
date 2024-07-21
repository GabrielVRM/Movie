const knex = require('../database/knex')
const AppError = require('../utils/appError')
const DiskStorage = require('../providers/DiskStorage')

class UseAvatarController {
  async update(req, res) {
    const { id } = req.params
    console.log(id)
    const avatarFilename = req.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex('users').where({ id }).first()
    console.log(user)
    if (!user) {
      throw new AppError('user not exists', 401)
    }

    if (user.avatar) {
      await diskStorage.deleteFile(user.avatar)
    }

    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename

    await knex('users').update(user).where({ id })

    return res.json(user)
  }
}

module.exports = UseAvatarController
