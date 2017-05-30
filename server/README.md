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
    {
        "username" : "epam",
        "password" : "test"
    }

- Invoke an Authorized endpoint
  - GET: http://localhost:8002/user/auth
    - Header
      Key: Authorization
      Value: Bearer [access_token]
