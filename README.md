# propX

## Getting Started

### Prerequisites

I build this project with the following setup:

- macOS Ventura v13.5.2
- node v18.18.0
- yarn v1.22.19
- npm v10.1.0
- Docker version 24.0.6, build ed223bc

---

## Development

1. create your `.env` file based on the `.env.example`

2. install all necessary dependencies

```bash
yarn install
```

3. start frontend

```bash
yarn frontend:start
```

4. start server

```bash
yarn server:start:dev
```

## Docker

start mongodb container

```bash
docker run -d -p 27017:27017 --name=propx-mongo mongo:latest
```

### Postman API Documentation

> https://documenter.getpostman.com/view/805335/2s9YCAQpye

---

## LICENSE

Copyright © 2023 [Dominic Kolbe](https://dominickolbe.dk) :de:
