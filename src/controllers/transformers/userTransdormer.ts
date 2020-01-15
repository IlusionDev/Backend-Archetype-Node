import User from '../../entities/User'

const userTransformer = function (user: User) {
  const newUser: User = user
  delete newUser.password
  delete newUser.hash

  return {
    ...user
  }
}

export default userTransformer
