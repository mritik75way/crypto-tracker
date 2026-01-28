import { useEffect } from 'react';
import { notification } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deactivateAlert } from '../features/alerts/alertsSlice';
import { formatCurrency } from '../utils/format';

const AlertWatcher = () => {
  const dispatch = useAppDispatch();
  const { coins } = useAppSelector((state) => state.market);
  const { items: alerts } = useAppSelector((state) => state.alerts);

  useEffect(() => {
    alerts.forEach((alert) => {
      if (!alert.isActive) return;

      const coin = coins.find((c) => c.id === alert.coinId);
      if (!coin) return;

      const currentPrice = coin.current_price;
      let triggered = false;

      if (alert.condition === 'above' && currentPrice >= alert.targetPrice) {
        triggered = true;
      } else if (alert.condition === 'below' && currentPrice <= alert.targetPrice) {
        triggered = true;
      }

      if (triggered) {
        notification.info({
          message: 'Price Alert Triggered!',
          description: `${coin.name} is now ${alert.condition} ${formatCurrency(alert.targetPrice)}. Current: ${formatCurrency(currentPrice)}`,
          placement: 'topRight',
          duration: 0, 
        });
        
        dispatch(deactivateAlert(alert.id));
      }
    });
  }, [coins, alerts, dispatch]);

  return null; 
};

export default AlertWatcher;