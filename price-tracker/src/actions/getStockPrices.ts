/**
 * Fetches 10 Stock data for the US exchange.
 * @returns Promise, list of the top 10 stocks from Finnhub.
 */
export const fetchStockList = async () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US`,
      {
        headers: {
          "X-Finnhub-Token": apiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching stock list: ${response.statusText}`);
    }
    const data = await response.json();
    // Check if the returned data is an array
    if (!Array.isArray(data)) {
      throw new Error("Unexpected response format");
    }

    // Get the top 10 stocks
    const topStocks = data.slice(0, 10);
    return topStocks;
  } catch (error) {
    // Handle and log the error
    console.error("Failed to fetch stock list:", error);
    throw new Error("Could not retrieve stock list. Please try again later.");
  }
};
