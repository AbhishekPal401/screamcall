import { GenerateSalt, GeneratePassword } from '../utils/password.js'
import UserRepository from '../repository/user.repository.js'

class UserApi {
  constructor() {
    this.repository = new UserRepository()
  }

  async registerUser(userData) {
    const { firstname, lastname, password, dob, gender, role, email } = userData

    const salt = await GenerateSalt()
    const hash = await GeneratePassword(password, salt)

    const result = await this.repository.createUser({
      firstname,
      lastname,
      dob,
      gender,
      role,
      salt,
      hash,
      email,
    })

    return result
  }

  async loginUser(userData) {
    const { email, password } = userData

    const result = await this.repository.validateUser({
      email,
      password,
    })

    return result
  }
}

export default UserApi
