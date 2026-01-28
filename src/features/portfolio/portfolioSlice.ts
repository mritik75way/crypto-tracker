import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PortfolioState, Transaction } from '../../types/portfolio';

const loadState = (): Transaction[] => {
  try {
    const serializedState = localStorage.getItem('portfolio');
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err)
    return [];
  }
};

const initialState: PortfolioState = {
  transactions: loadState(),
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
      localStorage.setItem('portfolio', JSON.stringify(state.transactions));
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
      localStorage.setItem('portfolio', JSON.stringify(state.transactions));
    },
  },
});

export const { addTransaction, removeTransaction } = portfolioSlice.actions;
export default portfolioSlice.reducer;