# CONTACT API SPEC

## CREATE CONTACT
Endpoint        : POST /api/contacts

Request Header    :

X-API-TOKEN = token

Request Body    :

```json
{
  "first_name" : "Ammar",
  "last_name" : "Asysyakur",
  "email" : "ammar@example.com",
  "phone" : "081289777971"
}
```

Response Body (Success)   :

```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Ammar",
    "last_name" : "Asysyakur",
    "email" : "ammar@example.com",
    "phone" : "081289777971"
  }
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Firstname must not blank, ..."
}
```

## GET CONTACT
Endpoint        : GET /api/contacts/:id

Request Header    :

X-API-TOKEN = token

Response Body (Success)   :

```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Ammar",
    "last_name" : "Asysyakur",
    "email" : "ammar@example.com",
    "phone" : "081289777971"
  }
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Contact is not found"
}
```

## UPDATE CONTACT
Endpoint        : PUT /api/contacts/:id

Request Header    :

X-API-TOKEN = token

Request Body    :

```json
{
  "first_name" : "Ammar",
  "last_name" : "Asysyakur",
  "email" : "ammar@example.com",
  "phone" : "081289777971"
}
```

Response Body (Success)   :

```json
{
  "data" : {
    "id" : 1,
    "first_name" : "Ammar",
    "last_name" : "Asysyakur",
    "email" : "ammar@example.com",
    "phone" : "081289777971"
  }
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Firstname must not blank, ..."
}
```

## REMOVE CONTACT
Endpoint        : DELETE /api/contacts/:id

Request Header    :

X-API-TOKEN = token

Response Body (Success)   :

```json
{
  "data" : "Success"
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Contact is not found"
}
```


## SEARCH CONTACT
Endpoint        : GET /api/contacts

Query Parameter:
- name: string, contact firstname or lastname, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Request Header    :

X-API-TOKEN = token


Response Body (Success)   :

```json
{
  "data" : [
    {
      "id" : 1,
      "first_name" : "Ammar",
      "last_name" : "Asysyakur",
      "email" : "ammar@example.com",
      "phone" : "081289777971"
    },
    {
      "id" : 1,
      "first_name" : "Ammar",
      "last_name" : "Asysyakur",
      "email" : "ammar@example.com",
      "phone" : "081289777971"
    }
  ],
  "paging" : {
    "current_page" : 1,
    "total_page" : 5,
    "size": 10
  }
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Unauthorized  "
}
```