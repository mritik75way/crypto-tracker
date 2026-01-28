import api from './api';
import { type Coin } from '../types/crypto';

export const cryptoApi = {
  getCoins: async (currency: string = 'usd'): Promise<Coin[]> => {
    const response = await api.get<Coin[]>(
      `/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    return response.data;
  },
};  