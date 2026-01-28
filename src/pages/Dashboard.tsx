import { lazy, Suspense, useMemo } from "react";
import { Row, Col, Typography, Skeleton } from "antd";
import { useAppSelector } from "../store/hooks";
import StatsCards from "../components/StatsCard";
import TopPerformers from "../components/TopPerformer";

const { Title } = Typography;

const AllocationChart = lazy(() => import("../components/AllocationChart"));
const ProfitLossAreaChart = lazy(
  () => import("../components/ProfitLossAreaChart"),
);

const Dashboard = () => {
  const { transactions } = useAppSelector((state) => state.portfolio);
  const { coins } = useAppSelector((state) => state.market);

  const stats = useMemo(() => {
    let totalValue = 0;
    let totalInvestment = 0;
    const coinLookup = new Map(coins.map(c => [c.id, c]));
    const coinMap = new Map<string, { quantity: number; investment: number; currentPrice: number }>();  

    transactions.forEach((t) => {
      const coin = coinLookup.get(t.coinId);
      const currentPrice = coin?.current_price || 0;

      const existing = coinMap.get(t.coinId) || {
        quantity: 0,
        investment: 0,
        currentPrice,
      };

      coinMap.set(t.coinId, {
        quantity: existing.quantity + t.quantity,
        investment: existing.investment + t.quantity * t.pricePerCoin,
        currentPrice,
      });

      totalValue += t.quantity * currentPrice;
      totalInvestment += t.quantity * t.pricePerCoin;
    });

    const chartData = Array.from(coinMap.entries()).map(([coinId, data]) => {
      const coinName = coins.find((c) => c.id === coinId)?.name || coinId;
      return {
        name: coinName,
        value: data.quantity * data.currentPrice,
      };
    });

    const profitLossData = Array.from(coinMap.entries())
      .map(([coinId, data]) => {
        const currentValue = data.quantity * data.currentPrice;
        const profit = currentValue - data.investment;
        const coinName = coins.find((c) => c.id === coinId)?.name || coinId;
        return {
          name: coinName,
          profit: profit,
        };
      })
      .sort((a, b) => b.profit - a.profit);

    const performanceData = Array.from(coinMap.entries())
      .map(([coinId, data]) => {
        const currentValue = data.quantity * data.currentPrice;
        const profit = currentValue - data.investment;
        const roi = data.investment > 0 ? (profit / data.investment) * 100 : 0;
        const coin = coins.find((c) => c.id === coinId);

        return {
          id: coinId,
          name: coin?.name || coinId,
          symbol: coin?.symbol || "",
          roi,
          currentValue,
        };
      })
      .sort((a, b) => b.roi - a.roi)
      .slice(0, 5);

    const profitLoss = totalValue - totalInvestment;
    const profitPercentage =
      totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;

    return {
      totalValue,
      totalInvestment,
      profitLoss,
      profitPercentage,
      chartData,
      performanceData,
      profitLossData,
    };
  }, [transactions, coins]);

  return (
    <div className="space-y-6">
      <Title level={3} style={{ margin: 0 }}>
        Dashboard
      </Title>

      <StatsCards
        totalValue={stats.totalValue}
        totalInvestment={stats.totalInvestment}
        profitLoss={stats.profitLoss}
        profitPercentage={stats.profitPercentage}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Suspense fallback={<Skeleton active paragraph={{ rows: 6 }} />}>
            <AllocationChart data={stats.chartData} />
          </Suspense>
        </Col>
        <Col xs={24} md={12}>
          <Suspense fallback={<Skeleton active paragraph={{ rows: 6 }} />}>
            <ProfitLossAreaChart data={stats.profitLossData} />
          </Suspense>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <TopPerformers data={stats.performanceData} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;