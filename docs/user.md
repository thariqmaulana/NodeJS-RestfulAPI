# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :
```json
{
  "username": "thariq",
  "password": "rahasia",
  "name": "Thariq Maulana"
}
```

Response Body Success :
```json
{
  "data": {
    "username": "thariq",
    "name": "Thariq Maulana"
  }
}
```

Response Body Error :
```json
{
  "errors": "Username Already Registered"
}
```


## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "thariq",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "invalid username or password"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body : 

```json
{
  "name": "new name", // opsional
  "password": "new password" // opsional
}
```

Response Body Success :

```json
{
  "data": {
    "username": "thariq",
    "name": "Updated name"
  }
}
```

Response Body Error : 

```json
{
  "errors": "max length name is 30"
}
```

## Get User API

Endpoint: GET /api/users/current

Headers :
- Authorization : token

Response Body :

```json
{
  "data": {
    "username": "thariq",
    "name": "Thariq Maulana"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```


## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
  // jangan lupa hapus token
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```