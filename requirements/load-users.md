# Load Users

> ## Success Case

1. ✅ Receive a request of type **GET** on rote **/api/users**
2. ✅ **Find** user with email and password provided
3. ✅ **Update** user data with created access token
4. ✅ Return **204** if no user is found
5. ✅ Return **200** with all user records

> ## Exceptions

1. ✅ Returns an error **404** if the API dont exist
2. ✅ Returns an error **500** if it goes wrong on load users

> ## Diagram

![authentication diagram](./load-users-diagram.png)