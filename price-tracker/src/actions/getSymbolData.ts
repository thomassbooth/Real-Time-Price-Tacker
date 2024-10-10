import queryString from "query-string";

/**
 * Returns all linked symbols to the provided symbol, anything with the same characters as the provided symbol
 * @param symbol symbol used in the trading api to represent a stock
 * @returns All linked symbols to the provided symbol
 */
export const getSymbolData = async (symbol: string) => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
  const queryStringified = queryString.stringify({ q: symbol, exchange: "US" });
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/search?${queryStringified}`,
      {
        headers: {
          "X-Finnhub-Token": apiKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching symbol data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle and log the error
    console.error("Failed to fetch symbol data:", error);
    throw new Error("Could not retrieve symbol data. Please try again later.");
  }
};
