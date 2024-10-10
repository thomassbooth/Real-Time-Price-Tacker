/**
 * API Request to get the initial stock price of a symbol
 * @param symbol symbol used in the trading api to represent a stock
 * @returns Promise, the stock price of the symbol
 */
export const getInitialStockPrice = async (symbol: string) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string; // Replace with your actual Finnhub API key // Default symbol for Apple Inc.
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}`,
    {
      headers: {
        "X-Finnhub-Token": apiKey,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json(); // Parse the error response
    throw new Error(
      `Error fetching stock data: ${errorData.error || response.statusText}`
    );
  }
  const data = await response.json();
  return data; // Return the real-time stock data
};
