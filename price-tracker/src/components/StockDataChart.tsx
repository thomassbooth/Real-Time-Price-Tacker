"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { initialStockData } from "@/lib/types";
import useLiveStockData from "@/hooks/useLiveStockData";

interface StockDataChartProps {
  initialStockData: initialStockData;
  symbol: string;
}

export const StockDataChart: React.FC<StockDataChartProps> = ({
  initialStockData,
  symbol,
}) => {
  const { stockData } = useLiveStockData(symbol, initialStockData);

  // Calculate the min and max values for the Y-axis
  const prices = stockData.map((data) => data.c);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Round up for min and down for max
  const yMin = Math.floor(minPrice * 100) / 100; // Round down to 2 decimal places
  const yMax = Math.ceil(maxPrice * 100) / 100; // Round up to 2 decimal places

  console.log(stockData);
  return (
    <div className="w-[80vw] h-[80vh]">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Pricing Line Chart - {symbol}</CardTitle>
          <CardDescription>Live price tracker</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer data-testid="chart-container" config={{}}>
            <LineChart
              accessibilityLayer
              data={stockData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <YAxis
                dataKey="c"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[yMin, yMax]} // Set the dynamic domain
                tickFormatter={(value) => "$" + value} // Format to 2 decimal places
              />
              <XAxis
                dataKey="t"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value); // Create a Date object from milliseconds
                  return date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit", // Optional: Include seconds if needed
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="c" // Use 'c' for current price
                type="linear"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false} // No dots by default
                activeDot={{
                  stroke: "#8884d8", // Color of the active dot
                  strokeWidth: 2,
                  r: 5, // Radius of the active dot
                }} // Show active dot on hover
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
