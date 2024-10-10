import { getInitialStockPrice } from '@/actions/getInitialStockPrice';

describe('getInitialStockPrice', () => {
  const mockSymbol = 'AAPL';
  const mockApiKey = 'test_api_key';

  beforeAll(() => {
    // Set the environment variable for the API key
    process.env.NEXT_PUBLIC_API_KEY = mockApiKey;
  });

  beforeEach(() => {
    // Reset fetch before each test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return initial stock price data successfully', async () => {
    const mockResponseData = {
      c: 150,
      h: 155,
      l: 145,
      o: 148,
      pc: 149,
    };

    // Success
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponseData),
    });

    const data = await getInitialStockPrice(mockSymbol);
    expect(global.fetch).toHaveBeenCalledWith(
      `https://finnhub.io/api/v1/quote?symbol=${mockSymbol}`,
      {
        headers: {
          'X-Finnhub-Token': mockApiKey,
        },
      }
    );
    expect(data).toEqual(mockResponseData);
  });

  it('should throw an error when the API response is not ok', async () => {
    const mockErrorResponse = { error: 'Symbol not found' };
    // Error response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
      statusText: 'Not Found',
    });

    await expect(getInitialStockPrice(mockSymbol)).rejects.toThrow(
      'Error fetching stock data: Symbol not found'
    );
  });

  it('should throw an error when the API response is not ok without error message', async () => {
    // anotehr error
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({}),
      statusText: 'Bad Request',
    });

    await expect(getInitialStockPrice(mockSymbol)).rejects.toThrow(
      'Error fetching stock data: Bad Request'
    );
  });
});
