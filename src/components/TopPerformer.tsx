import { Card, List } from 'antd';
import { formatCurrency } from '../utils/format';

interface Performer {
  id: string;
  name: string;
  symbol: string;
  roi: number;
  currentValue: number;
}

interface Props {
  data: Performer[];
}

const TopPerformers = ({ data }: Props) => {
  return (
    <Card title="Top Performers (ROI)" bordered={false} className="shadow-sm h-full">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>                                            vbh
            <List.Item.Meta
              title={
                <span className="font-semibold">
                  {item.name} <span className="text-gray-400 text-xs uppercase">{item.symbol}</span>
                </span>
              }
              description={`Value: ${formatCurrency(item.currentValue)}`}
            />
            <div className={`font-bold ${item.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {item.roi > 0 ? '+' : ''}{item.roi.toFixed(2)}%
            </div>
          </List.Item>
        )}
        locale={{ emptyText: 'No performance data yet' }}
      />
    </Card>
  );
};

export default TopPerformers;