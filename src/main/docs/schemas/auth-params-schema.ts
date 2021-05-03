export const signUpParamsSchema = {
  type: 'object',
  required: ['email', 'password', 'passwordConfirmation'],
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    }
  }
}