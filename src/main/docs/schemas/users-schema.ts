export const usersSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      },
      accessToken: {
        type: 'string'
      }
    }
  }
}
