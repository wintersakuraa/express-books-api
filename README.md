# Express Books API

## Local Setup

```bash
# install packages
$ yarn

# add env variables
$ mv .env.example .env

# run docker containers with postgres db and redis
$ docker compose up --build -d
```

## Apply migrations

```bash
$ yarn db:migrate
```

## Seed first admin user

> **⚠️ Warning:**
> Specify `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env` file.

```bash
$ yarn db:seed
```

## Running the app

```bash
# build
$ yarn build

# start
$ yarn start

# watch mode
$ yarn start:dev
```

## Swagger docs route `/docs`
