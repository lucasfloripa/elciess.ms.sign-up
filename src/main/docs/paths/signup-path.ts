export const signUpPath = {
  post: {
    tags: ['SignUp'],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signupParams'
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
              $ref: '#/schemas/signup'
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
