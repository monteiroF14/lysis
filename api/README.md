# ♨️ lysis API

lysis app (aka. social media about animes & mangas) back-end built with TypeScript, Drizzle & ElysiaJS.

> 🔥 This project aims to keep runtime agnostic, this means it should work on Bun, Node, Cloudflare Workers or any Web Standard API compatible runtime.

## Running

This project depends on Docker to setup database. With Docker installed, clone the project, install dependencies, setup Docker containers and run the application.

> You must also run migrations to create database tables and run the seed to populate the database with fake data.

```sh
bun i
docker compose up -d
bun migrate
bun seed
bun dev
```

## Features

> The **summary** of the features are listed below. All the features contains E2E tests.
