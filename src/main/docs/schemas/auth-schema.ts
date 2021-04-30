export const authSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    accessToken: {
      type: 'string'
    }
  }
}
