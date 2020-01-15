const userValidator: any = {
  email: {
    in: ['body'],
    isEmail: true
  },
  password: {
    in: ['body']
  }
}

export default userValidator
