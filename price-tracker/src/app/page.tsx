import { getMarketStatus } from "@/actions/getMarketStatus";
import { getStockPrices } from "@/actions/getStockPrices";
import MarketStatus from "@/components/MarketStatus";
import StockTable from "@/components/StockTable";

export default async function Home() {
  const marketStatus = await getMarketStatus();
  const stocks = await getStockPrices();
  

  return (
    <div className="">
      <MarketStatus status={marketStatus.isOpen} />
      <div className = 'w-full px-2 py-10  rounded-lg'>
        <StockTable data={stocks} />
      </div>
    </div>
  );
}
