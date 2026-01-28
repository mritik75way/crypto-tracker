import { store } from '../store/store';
import { fetchCoins } from '../features/market/marketSlice';

export const marketLoader = async () => {
  const state = store.getState();
  
  if (state.market.coins.length === 0) {
    await store.dispatch(fetchCoins());
  }
  
  return null;
};