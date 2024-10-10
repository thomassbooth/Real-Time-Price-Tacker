'use client'

import React, { useCallback } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Stock } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface stockTableProps {
  data: Stock[];
}

const StockTable: React.FC<stockTableProps> = ({ data }) => {
    const router = useRouter()
    const navigate = useCallback((symbol: string) => {
        router.push(`/${symbol}`)
    }, [router])

  return (
    <Table>
      <TableCaption className = ''>A list of stocks from Finnhub.</TableCaption>
      <TableHeader className = 'text-black  '>
        <TableRow className = 'font-semibold text-black '>
          <TableHead className="">Symbol</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead className="text-right">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((stock) => (
          <TableRow key={stock.figi} className = 'hover:bg-neutral-100/50 cursor-pointer' onClick = {() => navigate(stock.symbol)}>
            <TableCell className = 'w-40 font-semibold'>{stock.symbol}</TableCell>
            <TableCell className="font-medium">{stock.description}</TableCell>
            <TableCell className = 'w-40'>{stock.currency}</TableCell>
            <TableCell className="text-right">{stock.type}</TableCell>
            <TableCell className="">
              <LinkCell symbol={stock.symbol} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StockTable;

interface linkCellProps {
  symbol: string;
}

const LinkCell: React.FC<linkCellProps> = ({ symbol }) => {
  return <Link href={`/${symbol}`}></Link>;
};
