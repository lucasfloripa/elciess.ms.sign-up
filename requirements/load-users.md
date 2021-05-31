# Load Users

> ## Success Case

1. ✅ Receive a request of type **GET** on rote **/api/users**
2. ✅ Authenticate **accessToken** if is **admin**
3. ✅ Return **200** with all user records

> ## Exceptions

1. ✅ Returns an error **404** if the API dont exist
2. ✅ Returns an error **401** if no accessToken is provided
3. ✅ Returns an error **403** if accessToken is invalid
4. ✅ Return **204** if no user is found
5. ✅ Returns an error **500** if an error accours when is tried load users

> ## Diagram

![load users diagram](./load-users-diagram.png)