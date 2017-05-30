# POC - Authentication

Using the Express 4.0 Router

## Requirements

- Node and npm

## Installation

- Install dependencies: `npm install`
- Start the server: `node server.js`

## Testing the API
Test your API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)
- Get Access token
  - POST: http://localhost:8002/user/auth
    - **Request Body: **
    ___
    {
        "username" : "epam",
        "password" : "test"
    }

- Invoke an Authorized endpoint
  - GET: http://localhost:8002/user/auth
    - Header
      - **Key:** Authorization
      - **Value**: Bearer [access_token]
      - **Sample**: Authorization:Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZXBhbS5jb20iLCJhdWQiOiJqd3QtYXV0aCIsImV4cCI6MTQ5NjE1MTcxOSwic2NvcGUiOiJmdWxsX2FjY2VzcyIsInN1YiI6InVzZXJfcHJvZmlsZXxwaWN0dXJlcyIsImp0aSI6InJ0Mk9UamdHWUdNNm5VNFIiLCJhbGciOiJIUzI1NiIsImlhdCI6MTQ5NjE0ODExOX0.U8iyQOXRgBqOMDsA3jSa24nMp_xajddVEU9Qi4VXfV0