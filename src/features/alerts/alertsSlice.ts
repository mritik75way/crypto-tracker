import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

export interface PriceAlert {
  id: string;
  coinId: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean; 
}

interface AlertsState {
  items: PriceAlert[];
}

const loadState = (): PriceAlert[] => {
  try {
    const serialized = localStorage.getItem('alerts');
    return serialized ? JSON.parse(serialized) : [];
  } catch {
    return [];
  }
};

const initialState: AlertsState = {
  items: loadState(),
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<PriceAlert>) => {
      state.items.push(action.payload);
      localStorage.setItem('alerts', JSON.stringify(state.items));
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((a) => a.id !== action.payload);
      localStorage.setItem('alerts', JSON.stringify(state.items));
    },
    deactivateAlert: (state, action: PayloadAction<string>) => {
      const alert = state.items.find((a) => a.id === action.payload);
      if (alert) {
        alert.isActive = false;
        localStorage.setItem('alerts', JSON.stringify(state.items));
      }
    },
  },
});

export const { addAlert, removeAlert, deactivateAlert } = alertsSlice.actions;
export default alertsSlice.reducer;