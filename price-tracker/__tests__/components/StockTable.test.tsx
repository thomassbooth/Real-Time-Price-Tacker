import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StockTable from "../../src/components/StockTable"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";

// Mock the Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockStocks = [
  {
    currency: "USD",
    description: "Apple Inc.",
    displaySymbol: "AAPL",
    figi: "FIGI1",
    isin: null,
    mic: "XNAS",
    shareClassFIGI: "SCFIGI1",
    symbol: "AAPL",
    symbol2: "AAPL2",
    type: "Common Stock",
  },
  {
    currency: "GBP",
    description: "Alphabet Inc.",
    displaySymbol: "GOOGL",
    figi: "FIGI2",
    isin: null,
    mic: "XNAS",
    shareClassFIGI: "SCFIGI2",
    symbol: "GOOGL",
    symbol2: "GOOGL2",
    type: "stock",
  },
];

describe("StockTable", () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
  };

  // mock useRouter
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the stock table correctly", () => {
    const { getByText } = render(<StockTable data={mockStocks} />);

    expect(getByText("A list of stocks from Finnhub.")).toBeInTheDocument();
    expect(getByText("AAPL")).toBeInTheDocument();
    expect(getByText("Apple Inc.")).toBeInTheDocument();
    expect(getByText("USD")).toBeInTheDocument();
    expect(getByText("stock")).toBeInTheDocument();
    expect(getByText("GOOGL")).toBeInTheDocument();
  });

  it("navigates to the correct stock symbol on row click", () => {
    const { getByText } = render(<StockTable data={[mockStocks[0]]} />);

    const row = getByText("AAPL").closest("tr");
    if (row) {
      fireEvent.click(row);
    }

    expect(mockPush).toHaveBeenCalledWith("/AAPL");
  });
});
