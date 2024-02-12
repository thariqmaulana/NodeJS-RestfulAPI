# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :
- Authorization : token

Request Body :

```json
{
  "first_name": "thariq",
  "last_name": "maulana",
  "email": "thariq@gmail.com",
  "phone": "080011002200"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1, // auto inc
    "first_name": "thariq",
    "last_name": "maulana",
    "email": "thariq@gmail.com",
    "phone": "080011002200"
  }
}
```

Response Body Error :

```json
{
  "errors": "email is not in valid format" // kira-kira apalagi yg cocok???
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :
- Authorization : token

Request Body :

```json
{
  "first_name": "thariq",
  "last_name": "maulana",
  "email": "thariq@gmail.com",
  "phone": "080011002200"
}
```

Response Body Success :

```json
{
 "data": {
  "id": 1,
  "first_name": "thariq",
  "last_name": "maulana",
  "email": "thariq@gmail.com",
  "phone": "080011002200"
  }
}
```

Response Body Error : 

```json
{
  "errors": "email is not in valid format"
}
```

## Get Contact API

Endpoint: GET /api/contacts/:id

Headers :
- Authorization : token

Response Body Success : 

```json
{
  "data": {
    "id": 1,
    "first_name": "thariq",
    "last_name": "maulana",
    "email": "thariq@gmail.com",
    "phone": "080011002200"
  }
}
```

Response Body Error :

```json
{
  "errors": "contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :
- Authorization : token

Query params : 
- name : Search by first_name or last_name, using like query, optional
- email : Search by email, using like query, optional
- phone : Search by phone, using like query, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "thariq",
      "last_name": "maulana",
      "email": "thariq@gmail.com",
      "phone": "080011002200"
    },
    { 
      "id": 2,
      "first_name": "thariq2",
      "last_name": "maulana",
      "email": "thariq2@gmail.com",
      "phone": "08001100220011"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error

## Remove Contact API

Endpoint: DELETE /api/contacts/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error : 

```json
{
  "errors": "contact is not found"
}
```