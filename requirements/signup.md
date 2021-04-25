# SignUp

> ## Success case

1. ✅ Receive a request of type **POST** on rote **/api/signup**
2. ✅ Validate mandatory data **email**, **password** and **passwordConfirmation**
3. ✅ Validate **password** and **passwordConfirmation** are equals
4. ✅ Validate **email** field is a valid email
5. ✅ **Validate** if the past email already been used by another user
6. ✅ Generate a **encrypted** password
7. ✅ **Create** an register for the user with the passed data with the encrypted password
8. ✅ Returns **200** with the user email

> ## Exceptions

1. ✅ Returns an error **404** if the API dont exist
2. ✅ Returns an error **400** if email, password or passwordConfirmation are not provided by the client
3. ✅ Returns an error **400** if password e passwordConfirmation are not equals
4. ✅ Returns an error **400** if the email field is a invalid email
5. ✅ Returns an error **403** if the email provided is already in use
6. ✅ Returns an error **500** if an error accours when is tried to generate a encrypted passoword
7. ✅ Returns an error **500** if an error accours when is tried to create a user register