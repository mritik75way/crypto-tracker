import { Card, Statistic, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { formatCurrency } from '../utils/format';

interface StatsProps {
  totalValue: number;
  totalInvestment: number;
  profitLoss: number;
  profitPercentage: number;
}

const StatsCards = ({ totalValue, totalInvestment, profitLoss, profitPercentage }: StatsProps) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <Card bordered={false} className="shadow-sm">
          <Statistic 
            title="Total Balance" 
            value={totalValue} 
            precision={2}
            formatter={(val) => formatCurrency(Number(val))}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card bordered={false} className="shadow-sm">
          <Statistic 
            title="Total Investment" 
            value={totalInvestment} 
            precision={2}
            formatter={(val) => formatCurrency(Number(val))}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card bordered={false} className="shadow-sm">
          <Statistic
            title="Net Profit / Loss"
            value={profitLoss}
            precision={2}
            formatter={(val) => formatCurrency(Number(val))}
            valueStyle={{ color: profitLoss >= 0 ? '#3f8600' : '#cf1322' }}
            prefix={profitLoss >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix={`(${profitPercentage.toFixed(2)}%)`}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatsCards;