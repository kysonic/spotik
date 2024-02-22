# Spotik 

This my simple project made for learning purposes, so how I think simple todo is not enough to test framework or new technology stack. Spotik it is kind of Spotify clone.

Stack: NextJS, Tailwind, Clerk, PostgreSQL (Without ORM for learning purposes)

- [Mockup](https://drive.google.com/file/d/1RV9lucqem-FvaCmgCpxtxNLJP7JhBqe8/view?usp=sharing)
- [DB structure](https://dbdiagram.io/d/Spotik-65d617ac783e8c6ca517eb97)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## PostgreSQL 

If you don't have local PostgreSQL installed you can use Docker file included 

```
docker build -t my-postgres .
docker run --name my-postgres -p 5432:5432 -d my-postgres
```


## Migrations

Create 

```
yarn migrate create <NAME>
```

UP/DOWN

```
export DATABASE_URL=postgres://spotikuser:potikpassword@localhost:5432/spotik
yarn migrate up
yarn migrate down
```

## Clerk 

This application uses Clerk for authorization and authentication, so you need to create new clerk app, 
and provide credentials in .env.local

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```