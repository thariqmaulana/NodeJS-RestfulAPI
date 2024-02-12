# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactId/addresses

Headers :
- Authorization : token

Request Body :

```json
{
  "street": "Jalan A",
  "city": "Kota",
  "province": "provinsi",
  "country": "negara",
  "postal_code": "Kode pos" 
}
```

Response Body Success :

```json
{
  "data": {
  "id": 1,
  "street": "Jalan A",
  "city": "Kota",
  "province": "provinsi",
  "country": "negara",
  "postal_code": "Kode pos" 
}
}
```

Response Body Error : 

```json
{
  "errors": "country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token

Request Body :

```json
{
  "street": "Jalan A",
  "city": "Kota",
  "province": "provinsi",
  "country": "negara",
  "postal_code": "Kode pos" 
}
```

Response Body Success :

```json
{
  "data": {
  "id": 1,
  "street": "Jalan A",
  "city": "Kota",
  "province": "provinsi",
  "country": "negara",
  "postal_code": "Kode pos" 
}
}
```

Response Body Error : 

```json
{
  "errors": "country is required"
}
```

## Get Address API

Endpoint : POST /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": {
  "id": 1,
  "street": "Jalan A",
  "city": "Kota",
  "province": "provinsi",
  "country": "negara",
  "postal_code": "Kode pos" 
}
}
```

Response Body Error : 

```json
{
  "errors": "contact is not found"
}
```

## List Addresses API

Endpoint : GET /api/contacts/:contactId/addresses

Headers :
- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
    "id": 1,
    "street": "Jalan A",
    "city": "Kota",
    "province": "provinsi",
    "country": "negara",
    "postal_code": "Kode pos" 
    },
    {
    "id": 2,
    "street": "Jalan A",
    "city": "Kota",
    "province": "provinsi",
    "country": "negara",
    "postal_code": "Kode pos" 
    }
  ]
}
```

Response Body Error : 

```json
{
  "errors": "contact is not found"
}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

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
  "errors": "address is not found"
}
```