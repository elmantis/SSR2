# SSR2

## A React SSR application

This is an SSR React application that creates a user from user input data, using their location it retrieves the timezone and it displays it on a table.

# Frameworks and Tools

- React V19
- Express V4
- Firebase RealTime Database
- React Hook Form
- Typescript
- Yup Validation
- Jest testing
- React Testing Library
- Webpack Build
- Bulma CSS

## Features

- Create a user
- Update a user
- Only update the users timezone and coordinates if zip code changes
- Server uses pipeable stream to Client
- Form Input validation in client
- Validation on server
- View updated changes when user updates data

## Installation

Create a .env.development file and add your open weather api key, timedb key.credentials, go to your firebase console and export your credentials. In the server file create a firebase_keys.ts file.

Install the dependencies and devDependencies, run a build then start the server.

```sh
npm i
npm run build
npm run dev
```

Because we need the jsdom assertions for react testing the tests are split.
To run the server tests use this command.

```sh
npm run test:server
```

For UI tests use this commaand

```sh
npm run test:server
```
