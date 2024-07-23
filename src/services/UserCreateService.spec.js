const UseRepositoryInMemory = require('../repositories/UseRepositoryInMemory')
const UserCreateService = require('./UseCreateService')
const AppError = require('../utils/appError')

describe('UserCreateUser', () => {
  let userRepositoryInMemo
  let userCreateService

  beforeEach(() => {
    userRepositoryInMemo = new UseRepositoryInMemory()
    userCreateService = new UserCreateService(userRepositoryInMemo)
  })

  it('user should be created', async () => {
    const user = {
      name: 'teste',
      email: 'teste@uol.com',
      password: '123456',
    }

    const userCreated = await userCreateService.execute(user)

    console.log(userCreated)

    expect(userCreated).toHaveProperty('id')
  })

  it('user not should be created with exists email', async () => {
    const user_1 = {
      name: 'teste_1',
      email: 'teste@uol.com',
      password: '123456',
    }

    const user_2 = {
      name: 'teste_2',
      email: 'teste@uol.com',
      password: '1234567',
    }

    await userCreateService.execute(user_1)
    expect(async () => await userCreateService.execute(user_2)).rejects.toEqual(
      new AppError('WARNING: email já existe!')
    )
  })
})
