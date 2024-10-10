import { MarketStatus } from "@/lib/types";

/**
 * Gets the status of the market for the US stock exchange.
 * @returns Promise, the market status of the US stock exchange
 */
export const getMarketStatus: () => Promise<MarketStatus> = async () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
  try {
    const response = await fetch(
      `https://finnhub.io/api/v1/stock/market-status?exchange=US`,
      {
        headers: {
          "X-Finnhub-Token": apiKey,
        },
      }
    );

    // Check if response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`Error fetching market status: ${response.statusText}`);
    }

    const data = await response.json();

    return data as MarketStatus;
  } catch (error) {
    // Handle and log the error
    console.error("Failed to fetch market status:", error);
    throw new Error(
      "Could not retrieve market status. Please try again later."
    );
  }
};
