export const deleteUserParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {
      type: 'string'
    }
  }
}
