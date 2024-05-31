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
git clone https://github.com/yourusername/crypto-monitor.git
cd crypto-monitor

## 2. Install dependencies
npm install

## 3. Create a .env file and add required URLs (MongoDB, Redis URL, Redis API Key)

## 4. Compile TypeScript files
tsc -b

## 5. Run the code
node dist/app.js

