# POC - Authentication

Using the Express 4.0 Router

## Requirements

- Node and npm

## Installation

- Install dependencies: `npm install`
- Start the server: `node server.js`

## Testing the API
Test your API using [Postman](https://chrome.google.com/webstore/detail/postman-rest-client-packa/fhbjgbiflinjbdggehcddcbncdddomop)
- POST: http://localhost:8001/user/auth
    {
        "username" : "epam",
        "password" : "test"
    }

- GET: http://localhost:8001/user/auth
This enpoint must be authenticated. The following is required in the header
    Key: Authorization
    Value: Bearer [access_token]
