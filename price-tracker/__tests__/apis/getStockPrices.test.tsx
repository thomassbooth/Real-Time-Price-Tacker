import { getStockPrices } from '@/actions/getStockPrices'; // Adjust the import path based on your project structure

describe('getStockPrices', () => {
  const mockApiKey = 'test_api_key';

  beforeAll(() => {
    process.env.NEXT_PUBLIC_API_KEY = mockApiKey;
  });

  beforeEach(() => {
    // Reset fetch before each test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return the top 10 stocks successfully', async () => {
    const mockStockData = Array.from({ length: 20 }, (_, index) => ({
      symbol: `AAPL${index}`,
      description: `Apple Inc ${index}`,
    }));

    //successful response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockStockData),
    });

    const stocks = await getStockPrices();

    expect(global.fetch).toHaveBeenCalledWith(
      `https://finnhub.io/api/v1/stock/symbol?exchange=US`,
      {
        headers: {
          'X-Finnhub-Token': mockApiKey,
        },
      }
    );
    expect(stocks).toEqual(mockStockData.slice(0, 10));
  });

  it('should throw an error when the API response is not ok', async () => {
    // Error response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({}),
      statusText: 'Not Found',
    });

    await expect(getStockPrices()).rejects.toThrow(
      'Could not retrieve stock list. Please try again later.'
    );
  });

  it('should throw an error when the response format is unexpected', async () => {
    // Different response format
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({}),
    });

    await expect(getStockPrices()).rejects.toThrow(
      'Could not retrieve stock list. Please try again later.'
    );
  });

  it('should throw an error when an exception occurs', async () => {
    // Another error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    await expect(getStockPrices()).rejects.toThrow(
      'Could not retrieve stock list. Please try again later.'
    );
  });
});
