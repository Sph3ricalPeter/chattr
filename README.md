![Chattr](/chattr-ui/public/chattr_logo.png)

A simple chat app built with React, ChakraUI &amp; Nest.js

---

## Features

- anonymous live chat preview
- user accounts
- live chat participation for users

---

## Deploy

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/7dhqP_?referralCode=StQ9gJ)


### Run Locally

#### Pre-requisites
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js 18+](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)

```bash
# PostgreSQL DB
cd chattr-api && pnpm i
cd prisma && docker-compose up -d
cd .. && pnpm run build:prod && pnpm run start:prod

# API
cd chattr-api && pnpm i && pnpm nest dev

# UI
cd chattr-ui && pnpm i && pnpm vite dev
```

---

## Repo Structure

`chattr-ui/` - React frontend, ChakraUI, Socket.io &amp; React Router
  - `main.tsx` - entry point
  - `Auth.tsx` - authentication context
  - `SocketContext.tsx` - socket.io context
  - `App.tsx`, `Chat.tsx`, `Comment.tsx` - app layout & login, signup modals, chat, comment components 
  - `Api.ts` - API client

`chattr-api/` - Nest.js backend, Prisma, Socket.io &amp;
  - `main.ts` - entry point, setup
  - `http-ex.filter.ts` - HTTP exception filter
  - modules
    - `auth` - authentication module
    - `users` - user module
    - `messages` - message module, websocket gateway