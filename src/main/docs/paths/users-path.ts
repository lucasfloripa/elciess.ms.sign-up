export const usersPath = {
  get: {
    tags: ['Get Users'],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/users'
            }
          }
        }
      },
      204: {
        $ref: '#/components/noContentResponse'
      },
      500: {
        $ref: '#/components/serverErrorResponse'
      }
    }
  }
}
