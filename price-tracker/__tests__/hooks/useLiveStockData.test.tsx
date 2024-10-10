import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import useLiveStockData from "@/hooks/useLiveStockData";

interface StockData {
  c: number;
  t: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

const mockInitialData: StockData = {
  c: 100,
  t: 162750,
  d: 5,
  dp: 0.5,
  h: 105,
  l: 95,
  o: 98,
  pc: 96,
};
describe("useLiveStockData", () => {
  let mockWebSocket: Partial<WebSocket>;

  beforeEach(() => {
    // Mock the WebSocket constructor with necessary static properties
    mockWebSocket = {
      send: jest.fn(),
      close: jest.fn(),
      readyState: WebSocket.OPEN,
      onopen: jest.fn(),
      onmessage: jest.fn(),
    };

    // Manually add static properties to the mocked WebSocket constructor
    global.WebSocket = jest.fn(
      (url: string | URL, protocols?: string | string[]) =>
        mockWebSocket as WebSocket
    ) as unknown as {
      new (url: string | URL, protocols?: string | string[]): WebSocket;
      prototype: WebSocket;
      readonly CONNECTING: 0;
      readonly OPEN: 1;
      readonly CLOSING: 2;
      readonly CLOSED: 3;
    };

    (global.WebSocket as any).CONNECTING = 0;
    (global.WebSocket as any).OPEN = 1;
    (global.WebSocket as any).CLOSING = 2;
    (global.WebSocket as any).CLOSED = 3;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a WebSocket and subscribe to stock symbol", () => {
    const { result } = renderHook(() =>
      useLiveStockData("AAPL", mockInitialData)
    );
    expect(result.current.stockData).toEqual([{ c: 100, t: 162750 }]);
    // Simulate WebSocket open and sending the subscription
    act(() => {
      (mockWebSocket.onopen as () => void)();
    });
    expect(mockWebSocket.send).toHaveBeenCalledWith(
      JSON.stringify({ type: "subscribe", symbol: "AAPL" })
    );
  });

  it("should handle incoming stock data messages and update state", () => {
    const { result } = renderHook(() =>
      useLiveStockData("AAPL", mockInitialData)
    );

    act(() => {
      // Simulate a "trade" message from the WebSocket
      (mockWebSocket.onmessage as (event: MessageEvent) => void)({
        data: JSON.stringify({
          type: "trade",
          data: [{ p: 150, t: 162760 }],
        }),
      } as MessageEvent);
    });

    expect(result.current.stockData).toEqual([
      { c: 100, t: 162750 },
      { c: 150, t: 162760 },
    ]);
  });

  it("should handle WebSocket closing and cleanup", () => {
    const { unmount } = renderHook(() =>
      useLiveStockData("AAPL", mockInitialData)
    );

    // Simulate unmount and cleanup
    act(() => {
      unmount();
    });

    expect(mockWebSocket.send).toHaveBeenCalledWith(
      JSON.stringify({ type: "unsubscribe", symbol: "AAPL" })
    );
    expect(mockWebSocket.close).toHaveBeenCalled();
  });
});
