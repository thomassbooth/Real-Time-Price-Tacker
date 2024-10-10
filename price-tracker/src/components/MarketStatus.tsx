import React from "react";

interface MarketStatusProps {
  status: boolean;
}

const MarketStatus: React.FC<MarketStatusProps> = ({ status }) => {
  return (
    <div className="my-5">
      <span>
        Market Status:{" "}
        <span className={`font-semibold ${status ? "text-green-700" : "text-red-700"}`}>
          {status ? "Open" : "Closed"}
        </span>
      </span>
    </div>
  );
};

export default MarketStatus;
