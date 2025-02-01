# User API Spec

## Register User
Endpoint        : POST /api/users

Request Body    : 

```json
{
  "username" : "Amrasykr",
  "password" : "secret",
  "name" : "Ammar Asysyakur"
}
```

Response Body (Success)   :

```json
{
  "data" : {
    "username" : "Amrasykr",
    "name" : "Ammar Asysyakur"
  }
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Username must not blank, ..."
}
```

## Login User

Endpoint        : POST /api/users/login

Request Body    :

```json
{
  "username" : "Amrasykr",
  "password" : "secret"
}
```

Response Body (Success)   :

```json
{
  "data" : {
    "username" : "Amrasykr",
    "name" : "Ammar Asysyakur",
    "session" : "uuid"
  }
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Username and password incorrect, ..."
}
```



## Get User

Endpoint        : GET /api/users/current

Request Header    :

X-API-TOKEN = token


Response Body (Success)   :

```json
{
  "data" : {
    "username" : "Amrasykr",
    "name" : "Ammar Asysyakur"
  }
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Update User

Endpoint        : PATCH /api/users/current

Request Header    :

X-API-TOKEN = token

Request Body    :

```json
{
  "username" : "Amrasykr", // TIDAK WAJIB
  "password" : "secret" // TIDAK WAJIB
}
```

Response Body (Success)   :

```json
{
  "data" : {
    "username" : "Amrasykr",
    "name" : "Ammar Asysyakur"
  }
}
```

Response Body (Failed)   :

```json
{
  "errors" : "Unauthorized, ..."
}
```

## Logout User

Endpoint        : DELETE /api/users/current

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
  "errors" : "Unauthorized"
}
```

