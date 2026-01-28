import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type Coin } from '../../types/crypto';
import { cryptoApi } from '../../services/cryptoApi';

interface MarketState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
}

const initialState: MarketState = {
  coins: [],
  loading: false,
  error: null,
};

export const fetchCoins = createAsyncThunk(
  'market/fetchCoins',
  async () => {
    const response = await cryptoApi.getCoins();
    return response;
  }
);

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch market data';
      });
  },
});

export default marketSlice.reducer;