const AppError = require('../utils/appError')
const { hash, compare } = require('bcryptjs')

class UseCreateService {
  constructor(useRepository) {
    this.useRepository = useRepository
  }
  async execute({ name, email, password }) {
    try {
      const user = await this.useRepository.findByEmail(email)
      if (user) {
        throw new AppError('WARNING: email já existe!')
      }

      const hashedPassword = await hash(password, 8)

      await this.useRepository.create({ name, email, hashedPassword })
    } catch (error) {
      throw new AppError(error.message)
    }
  }
}

module.exports = UseCreateService
