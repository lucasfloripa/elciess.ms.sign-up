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
      }
    }
  }
}
