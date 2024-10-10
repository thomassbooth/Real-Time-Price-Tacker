# Realtime-pricetrackerThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
# Setting up env

Setup the finnhub api, signup and retrieve your free api key and populate .env inside /price-tracker
```bash
NEXT_PUBLIC_API_KEY=yourapikey
```

# Running development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Building the server

```bash

npm run build

npm start
```

## Libary Usage

- Routing: Nextjs 14
Advanced routing, easy use of navigation using next Links to prerender pages.
Severside rendering: allowing us to not expose api keys by making requests that use api keys serverside, prefetched data is done before showing the user the pages, loading pages using suspense can be added easily (time constraint).
Instead of needing to use React Context or Zustand/Redux the state of the selected stock to track is just in the URL path done very easily in nextjs using dynamic routes.

- Styling: Tailwind css
Allows for fast development, without the need of writing alot of css.

- Testing: Jest
Easy mocking and retrieving dom elements to check components render with mock data.

- Component Library: Shadcn
Very easy to setup, customise and looks nice also!

- Trading API: Finnhub
Has alot of stock data, its free and easy to use.
Only drawback is to see stock price history it is a paid endpoint, instead I just retrieved the initial price which is essential the same just instead of a list its one item.