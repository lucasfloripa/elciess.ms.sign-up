export const forbiddenResponse = {
  description: 'Email in use',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
