// src/__tests__/StockDataChart.test.tsx
import { render, screen } from '@testing-library/react';
import { StockDataChart } from '@/components/StockDataChart';
import '@testing-library/jest-dom';
import { initialStockData } from '@/lib/types';
import useLiveStockData from '@/hooks/useLiveStockData';
import React from 'react';

// Mock the custom hook
jest.mock('../src/hooks/useLiveStockData');


// Polyfill for ResizeObserver
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  
const mockStockData = [
  { t: 1640995200000, c: 100 }, // January 1, 2022
  { t: 1641081600000, c: 105 }, // January 2, 2022
  { t: 1641168000000, c: 110 }, // January 3, 2022
];

const mockInitialStockData: initialStockData = {
  c: 100,  
  d: 5,    
  dp: 5,   
  h: 110,  
  l: 95,   
  o: 97,   
  pc: 10,
  t: Date.now()
};

describe('StockDataChart', () => {
  beforeEach(() => {
    // Mock the implementation of the custom hook
    (useLiveStockData as jest.Mock).mockReturnValue({ stockData: mockStockData });
  });

  it('renders the chart with correct title and description', () => {
    render(<StockDataChart initialStockData={mockInitialStockData} symbol="AAPL" />);

    expect(screen.getByRole('heading', { level: 3, name: /Pricing Line Chart - AAPL/i })).toBeInTheDocument();
    expect(screen.getByText(/Live price tracker/i)).toBeInTheDocument();
  });

  it('renders the chart container', () => {
    render(<StockDataChart initialStockData={mockInitialStockData} symbol="AAPL" />);
    
    const chartContainer = screen.getByTestId('chart-container');
    expect(chartContainer).toBeInTheDocument();
  });
});
