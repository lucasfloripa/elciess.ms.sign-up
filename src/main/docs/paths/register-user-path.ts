export const registerUserPath = {
  post: {
    tags: ['RegisterUser'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/registerUserParams'
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
              $ref: '#/schemas/registerUser'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequestResponse'
      },
      403: {
        $ref: '#/components/forbiddenResponse'
      },
      500: {
        $ref: '#/components/serverErrorResponse'
      }
    }
  }
}
