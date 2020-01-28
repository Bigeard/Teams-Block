JavaScript Blockchain
===

A simple implementation of blockchain using express and web sockets that allows you to add data and view the chain details.

## Frameworks Used


1. [Node.JS](https://nodejs.org/en/)

2. [Socket.io](https://socket.io/)

3. [Express](https://expressjs.com/)

4. [PM2 Runtime](https://pm2.io/runtime/)

## Start-Up

1. Run `yarn install` or `npm install`

2. Run `yarn start` or `npm start`

## Endpoints

### POST /nodes

Request Body:

```json
{
  "host": "localhost",
  "port": 5000
}
```

### POST /data

Request Body:

```json
{
  "text": "Hello World",
  "number": 1
}
```

### GET /chain

Response: 

```json
[
  {
    "id": 0,
    "proof": 0,
    "timestamp": 1539970017557,
    "previousBlockHash": 1,
    "data": []
  },
  {
    "id": 1,
    "proof": 6109837942.514816,
    "timestamp": 1539970045394,
    "previousBlockHash": "4794a4da7764850e31a2974ea1983ee048e5d8db9d882c16e9d4b55c1ed4fd3e",
    "data": [
      {
        "text": "AAAA",
        "number": 1,
      },
      {
        "text": "AAAA",
        "number": 2,
      },
            {
        "text": "AAAA",
        "number": 3,
      },
            {
        "text": "AAAA",
        "number": 4,
      },
    ]
  },
```