import { getMarketStatus } from '@/actions/getMarketStatus'; // Adjust the import path based on your project structure
import { MarketStatus } from '@/lib/types';

describe('getMarketStatus', () => {

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

  it('should fetch and return market status data successfully', async () => {
    const mockMarketStatus: MarketStatus = {
      exhange: 'US',
      holiday: false,
      isOpen: true,
      session: 'regular',
      t: 1697116800,
      timezone: 'America/New_York',
    };

    // Successful response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockMarketStatus),
    });

    const data = await getMarketStatus();

    expect(global.fetch).toHaveBeenCalledWith(
      `https://finnhub.io/api/v1/stock/market-status?exchange=US`,
      {
        headers: {
          'X-Finnhub-Token': mockApiKey,
        },
      }
    );
    expect(data).toEqual(mockMarketStatus); // Verify the returned data
  });

  it('should throw an error when the API response is not ok', async () => {
    // Error Response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({}),
      statusText: 'Not Found',
    });

    await expect(getMarketStatus()).rejects.toThrow(
      'Could not retrieve market status. Please try again later.'
    );
  });

  it('should throw an error when an exception occurs', async () => {
    // Error Response
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    await expect(getMarketStatus()).rejects.toThrow(
      'Could not retrieve market status. Please try again later.'
    );
  });
});
