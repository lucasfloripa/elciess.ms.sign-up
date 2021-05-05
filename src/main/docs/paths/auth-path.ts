export const authPath = {
  post: {
    tags: ['Auth'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/authParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/auth'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequestResponse'
      },
      401: {
        $ref: '#/components/unauthorizedResponse'
      },
      500: {
        $ref: '#/components/serverErrorResponse'
      }
    }
  }
}
