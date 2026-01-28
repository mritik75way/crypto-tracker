import { Card } from 'antd';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { formatCurrency } from '../utils/format';

interface ProfitData {
  name: string;
  profit: number;
}

interface Props {
  data: ProfitData[];
}

const ProfitLossAreaChart = ({ data }: Props) => {
  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.profit));
    const dataMin = Math.min(...data.map((i) => i.profit));
  
    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;
  
    return dataMax / (dataMax - dataMin);
  };
  
  const off = gradientOffset();

  return (
    <Card title="P/L Landscape" bordered={false} className="shadow-sm h-full">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(val) => `$${val}`} width={80} />
            <Tooltip 
              formatter={(value: number | string | Array<number | string> | undefined) => [formatCurrency(Number(value || 0)), 'Profit/Loss']}
            />
            <ReferenceLine y={0} stroke="#000" />
            <defs>
              <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset={off} stopColor="#3f8600" stopOpacity={0.8} />
                <stop offset={off} stopColor="#3f8600" stopOpacity={0} />
                <stop offset={off} stopColor="#cf1322" stopOpacity={0} />
                <stop offset={off} stopColor="#cf1322" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#000"
              strokeWidth={1}
              fill="url(#splitColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ProfitLossAreaChart;