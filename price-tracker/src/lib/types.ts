
export type Stock = {
    currency: string;
    description: string;
    displaySymbol: string;
    figi: string;
    isin: null;
    mic: string;
    shareClassFIGI: string;
    symbol: string;
    symbol2: string;
    type: string;
}

export type initialStockData = {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
}

export type StockData = {
    c: number;
    t: number;
}

export type MarketStatus = {
    exhange: string;
    holiday: boolean;
    isOpen: boolean;
    session: string;
    t: number;
    timezone: string
}