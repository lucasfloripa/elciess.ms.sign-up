export const serverErrorResponse = {
  description: 'Server Problem',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
