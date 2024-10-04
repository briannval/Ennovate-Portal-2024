# Ennovate Official Website

Official website of Ennovate, Enactus UBC

<div style="display: flex; align-items: center;">
  <img src="./public/logos/enactus-logo.webp" alt="Enactus Logo" style="width: 250px;" />
</div>

## Installation and Setup

Clone the project

```bash
  git clone https://github.com/briannval/ennovate-portal-2024.git
```

Go to the project directory

```bash
  cd ennovate-portal-2024
```

## Setup Environment Variables

Create a .env file in the root directory and add the following:

```bash
MONGO_URI
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
REDIS_URL

```

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Run With Docker

Run docker container

```bash
  docker compose up --build
```

## Support

For support, email ennovateubc@gmail.com or brianvalentinoadhitya@gmail.com.