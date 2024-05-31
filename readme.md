# Crypto Monitor

A real-time cryptocurrency price monitoring and alerting system with caching optimizations using Node.js, TypeScript, MongoDB, and Redis.

## Features

- Fetch real-time cryptocurrency prices using the CoinGecko API.
- Continuously update prices in real-time.
- Enable users to set alert criteria based on price changes.
- Send real-time alerts when criteria are met.
- Implement caching for recent price updates using Redis.
- Efficiently manage and refresh cached data.

## Tech Stack

- Node.js
- TypeScript
- MongoDB
- Redis
- Express.js
- Axios

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Redis installed and running

## Getting Started - Backend

 ## 1. Clone the repository
 ```bash
 https://github.com/shivapranav07/crypto-tracker-with-redis
 

## 2. Install dependencies
```bash
npm install

## 3. Create a .env file and add required URLs (MongoDB, Redis URL, Redis API Key)

## 4. Compile TypeScript files
```bash
tsc -b

## 5. Run the code
```bash
node dist/app.js

## API
```bash
 use http://localhost:3000/api/prices?cryptos=bitcoin&currencies=usd 
 ```
 =>to get current price of bitcoin and for every 30sec it will clear redis cache and gets new cost from coingeko and updates redis
```bash
  http://localhost:3000/api/alerts 
  ```
  for keeping alerts in the body give 
 {
  "userId": "user5",
  "crypto": "bitcoin",
  "targetPrice": 58000,
  "direction": "above"
}
 in this example it will alert you if the price of the crypto went above 58000 usd

