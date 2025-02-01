# ADDRESS API SPEC

## CREATE ADDRESS
Endpoint        : POST /api/contacts/:idContacts/addresses 

Request Header    :

X-API-TOKEN = token

Request Body    :

```json
{
  "street" : "Jl. Example",
  "city" : "Kota Example",
  "province" : "Provinsi Example",
  "country" : "Negara Example",
  "postal_code" : "313131"
  
}
```

Response Body (Success)   :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Example",
    "city": "Kota Example",
    "province": "Provinsi Example",
    "country": "Negara Example",
    "postal_code": "313131"
  }
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Street must not blank, ..."
}
```

## GET ADDRESS
Endpoint        : GET /api/contacts/:idContacts/addresses/:idAddress

Request Header    :

X-API-TOKEN = token

Response Body (Success)   :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Example",
    "city": "Kota Example",
    "province": "Provinsi Example",
    "country": "Negara Example",
    "postal_code": "313131"
  }
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Address Id is not found, ..."
}
```

## UPDATE ADDRESS
Endpoint        : PUT /api/contacts/:idContacts/addresses/:idAddress

Request Header    :

X-API-TOKEN = token

Request Body    :

```json
{
  "street" : "Jl. Example",
  "city" : "Kota Example",
  "province" : "Provinsi Example",
  "country" : "Negara Example",
  "postal_code" : "313131"
  
}
```

Response Body (Success)   :

```json
{
  "data": {
    "id": 1,
    "street": "Jl. Example",
    "city": "Kota Example",
    "province": "Provinsi Example",
    "country": "Negara Example",
    "postal_code": "313131"
  }
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Street must not blank, ..."
}
```

## REMOVE ADDRESS
Endpoint        : DELETE /api/contacts/:idContacts/addresses/:idAddress

Request Header    :

X-API-TOKEN = token

Response Body (Success)   :

```json
{
  "data": "Success"
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Address is not found, ..."
}
```

## LIST ADDRESS
Endpoint        : GET /api/contacts/:idcontacts/addresses

Request Header    :

X-API-TOKEN = token

Response Body (Success)   :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jl. Example",
      "city": "Kota Example",
      "province": "Provinsi Example",
      "country": "Negara Example",
      "postal_code": "313131"
    },
    {
      "id": 1,
      "street": "Jl. Example",
      "city": "Kota Example",
      "province": "Provinsi Example",
      "country": "Negara Example",
      "postal_code": "313131"
    }
  ]
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Contact is not found"
}
```