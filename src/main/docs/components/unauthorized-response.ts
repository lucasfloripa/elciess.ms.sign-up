export const unauthorizedResponse = {
  description: 'Unauthorized',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
