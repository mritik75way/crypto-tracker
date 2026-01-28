export interface Transaction {
  id: string;
  coinId: string; 
  quantity: number;
  pricePerCoin: number;
  date: string;
}

export interface PortfolioState {
  transactions: Transaction[];
}