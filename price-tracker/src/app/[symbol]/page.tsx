import { getInitialStockPrice } from "@/actions/getInitialStockPrice";
import { getMarketStatus } from "@/actions/getMarketStatus";
import { getSymbolData } from "@/actions/getSymbolData";
import MarketStatus from "@/components/MarketStatus";
import { StockDataChart } from "@/components/StockDataChart";

const StockPage = async ({ params }: { params: { symbol: string } }) => {
  const res = await getInitialStockPrice(params.symbol);
  const marketStatus = await getMarketStatus();
  const symbolData = await getSymbolData(params.symbol);
    console.log(symbolData)
    
  return (
    <div>
      <MarketStatus status={marketStatus.isOpen} />
      <StockDataChart symbol={params.symbol} initialStockData={res} />
    </div>
  );
};

export default StockPage;
