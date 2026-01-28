import { configureStore } from '@reduxjs/toolkit';
import marketReducer from '../features/market/marketSlice';
import portfolioReducer from '../features/portfolio/portfolioSlice';
import alertsReducer from '../features/alerts/alertsSlice';

export const store = configureStore({
  reducer: {
    market: marketReducer,
    portfolio: portfolioReducer,
    alerts: alertsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;