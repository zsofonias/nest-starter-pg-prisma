# The starter repo for a NestJS project!

Here’s what’s included in the starter repos:

- Setting up the ConfigModule and environment variables for Jest
- Enforcing consistent HTTP response structure
- Configuring some basic HTTP security
- Adding whitelisted validation to the NestJS server
- Setting up NestJS logging
- Docker compose set up for a Postgres database & Redis
- Prisma setup (the ORM we’ll be using in each project to interact with the database)
- Redis and CacheService setup
- Jest config (including env variables)

Here's how to get started with the repo:

## Cloning the repo

Follow these steps to get started:

1. Go to the [NestJS Starter Github repo](https://github.com/zsofonias/nest-starter-pg-prisma)
2. Git clone the repo onto your local machine. For example:

```
git clone git@github.com:zsofonias/nest-starter-pg-prisma.git
```

Checkout into your new repo and follow the steps below:

## Local set up

Install dependencies:

```
npm install
```

Copy the env example file.

```
cp .env.example .env
```

The NestJS server has 2 Docker Compose files. In both file, you need to update the name of the containers and networks where it says `# Needs updating`.

For example, here's an updated `docker-compose.yml` file for a project called "Url Shortener":

```yml
version: '3.8'

services:
  nest_starter_pg_prisma:
    image: postgres:alpine
    container_name: nest_starter_pg_prisma
    restart: always
    env_file:
      - .env
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    ports:
      - '6543:5432'
    volumes:
      - nest_starter_pg_prisma_data:/var/lib/postgresql/data

  nest_starter_pg_prisma_redis:
    image: redis:alpine
    container_name: nest_starter_pg_prisma_redis
    ports:
      - '6379:6379'
    volumes:
      - nest_starter_pg_prisma_redis_data:/data

networks:
  default:
    name: nest_starter_pg_prisma

volumes:
  nest_starter_pg_prisma_data:
  nest_starter_pg_prisma_redis_data:
```

Make sure you remember to also update the `docker-compose-test.yml` file!

This repo comes with a default `User` model out of the box defined in the `/apps/backend/src/database/prisma/prisma.schema` file:

```json
model User {
  id        String       @id @default(uuid())
  email     String    @unique
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

Before you can run the local server, you need to apply this migration to your local Postgres database.

Make sure on your local machine you don't have any existing Docker containers running that would cause a conflict.

Then spin up the local Postgres database using this script:

```shell
npm run docker:up
```

Then run this script to apply the migration to your local Postgres database:

```shell
npm run db:migrate:dev
```

And that's it!

You can now spin up your local server with this script:

```shell
npm run start:dev
```
