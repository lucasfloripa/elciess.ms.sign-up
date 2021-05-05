export const badRequestResponse = {
  description: 'Invalid Requisition',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
