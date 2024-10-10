# Realtime-pricetracker

## Getting Started
### Setting up env

Setup the finnhub api, signup and retrieve your free api key and populate .env inside /price-tracker
```bash
NEXT_PUBLIC_API_KEY=yourapikey
```

### Running development server

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

### Building the server

```bash

npm run build

npm start
```

## Libary Usage

- Routing: Nextjs 14
Advanced routing, easy use of navigation using next Links to prerender pages.
--Severside rendering: allowing us to not expose api keys by making requests that use api keys serverside, prefetched data is done before showing the user the pages, loading pages using suspense can be added easily (time constraint).
Instead of needing to use React Context or Zustand/Redux the state of the selected stock to track is just in the URL path done very easily in nextjs using dynamic routes.

- Styling: Tailwind css
--Allows for fast development, without the need of writing alot of css.

- Testing: Jest
--Easy mocking and retrieving dom elements to check components render with mock data.

- Component Library: Shadcn
--Very easy to setup, customise and looks nice also!

- Trading API: Finnhub
--Has alot of stock data, its free and easy to use.
Only drawback is to see stock price history it is a paid endpoint, instead I just retrieved the initial price which is essential the same just instead of a list its one item.

- Testing: Jest
-- Standard testing library

## Assumptions

- Home page holds a list of stocks and their data from the US Exchange.
- The Market isnt always open so websocket messages dont come in for updates only pings when its closed.
- Using external chart libraries to rerender displaying a line graph without candles as it wasnt included in the free api.
- I was ok using Nextjs for routing, clicking on the table rows to send the user to the corresponding page to view live data.

- Outside of market hours: https://localhost:3000/HP, i noticed HP was sending live updates outside of market hours when developing.

- Implementation of serverside rendering without suspense is ok due to timeframe constraints.

## Architecture descisions

- Seperating the live stock data logic into a hook.
- Having dynamic routes for each stock to view their live data.
- Creating a new websocket connection when moving to each new stock page to prevent multiple subscribers adding up and holding lots of data in state.
- Displaying data in a table and chart format.