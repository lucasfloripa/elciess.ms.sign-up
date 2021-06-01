export const notFoundResponse = {
  description: 'Not Found',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
