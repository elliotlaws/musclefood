# express-api

Node.js app using TypeScript and Express To get started run `yarn`

## Available Scripts

In the project directory, you can run: `yarn start` will run the app in
development mode.

The server listens on [http://localhost:8000](http://localhost:8000/) The server
will automatically reload if you make edits. You will also see any lint errors
in the console.

`yarn debug` will run the app in debug mode.

`yarn test` will run the Jest test runner.

## Endpoints

POST api/insert-coin

example request:

```json
{ "coin": "Dime" }
```

example response:

```json
{ "total": 2 }
```

GET api/check-status

example response:

```json
{ "message": "CURRENT TOTAL", "total": 1 }
```

GET api/return-coins

example response:

```json
{
  "coinReturn": ["Dime"],
  "message": "INSERT COIN"
}
```

GET api/select-product/:productId

example response:

```json
{
  "message": "THANK YOU",
  "dispensedProduct": "cola",
  "coinReturn": 1
}
```
