export const deleteUserPath = {
  delete: {
    tags: ['Delete User'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/deleteUserParams'
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
        $ref: '#/components/notFoundResponse'
      },
      500: {
        $ref: '#/components/serverErrorResponse'
      }
    }
  }
}
