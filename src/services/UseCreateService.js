const AppError = require('../utils/appError')
const { hash } = require('bcryptjs')

class UseCreateService {
  constructor(useRepository) {
    this.useRepository = useRepository
  }
  async execute({ name, email, password }) {
    try {
      const user = await this.useRepository.findByEmail({ email })
      if (user) {
        throw new AppError('WARNING: email já existe!')
      }

      const hashedPassword = await hash(password, 8)

      const userCreated = await this.useRepository.create({
        name,
        email,
        password: hashedPassword,
      })

      return userCreated
    } catch (error) {
      throw new AppError(error.message)
    }
  }
}

module.exports = UseCreateService
