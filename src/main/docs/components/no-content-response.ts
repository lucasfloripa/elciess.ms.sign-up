export const noContentResponse = {
  description: 'No Content',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/noContent'
      }
    }
  }
}
