import { initialStockData, StockData } from "@/lib/types";
import { useEffect, useState } from "react";

const useLiveStockData = (symbol: string, initalData: initialStockData) => {
  const [stockData, setStockData] = useState<StockData[]>([
    { c: initalData.c, t: initalData.t },
  ]);

  useEffect(() => {
    // Create the WebSocket connection when the component mounts or when the symbol changes
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const socket = new WebSocket(
      `wss://ws.finnhub.io?token=${apiKey}`
    );

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "subscribe", symbol: symbol })); // Subscribe to the provided symbol
      console.log("grabbing latest stock updates from: ", symbol);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "trade") {
        setStockData((prevData) => [
          ...prevData,
          { c: data.data[0].p, t: data.data[0].t },
        ]);
      } else if (data.type === "ping") {
        console.log("Received ping");
      } else {
        console.log("Message from server:", data);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };


    // Cleanup WebSocket connection when component unmounts or symbol changes
    return () => {
      console.log("Cleaning up WebSocket connection");
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "unsubscribe", symbol }));
        socket.close();
      }
    };
  }, [symbol]); // Re-run when the symbol changes

  return {
    stockData
  }; // No need to expose setWs since it's only managed internally
};

export default useLiveStockData;
