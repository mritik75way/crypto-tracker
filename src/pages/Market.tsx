import { useEffect, useState } from 'react';
import { Table, Tag, Typography, Avatar, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCoins } from '../features/market/marketSlice';
import { type Coin } from '../types/crypto';
import { formatCurrency } from '../utils/format';

const { Title } = Typography;

const Market = () => {
  const dispatch = useAppDispatch();
  const { coins, loading } = useAppSelector((state) => state.market);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  const filteredCoins = coins.filter((coin) => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnsType<Coin> = [
    {
      title: 'Coin',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar src={record.image} alt={record.name} />
          <div className="flex flex-col">
            <span className="font-semibold">{record.name}</span>
            <span className="text-gray-500 text-xs uppercase">{record.symbol}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'current_price',
      key: 'current_price',
      align: 'right',
      sorter: (a, b) => a.current_price - b.current_price,
      render: (price) => formatCurrency(price),
    },
    {
      title: '24h Change',
      dataIndex: 'price_change_percentage_24h',
      key: 'price_change_percentage_24h',
      align: 'right',
      sorter: (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
      render: (change) => {
        const isPositive = change > 0;
        return (
          <Tag color={isPositive ? 'green' : 'red'}>
            {isPositive ? '+' : ''}{change.toFixed(2)}%
          </Tag>
        );
      },
    },
    {
      title: 'Market Cap',
      dataIndex: 'market_cap',
      key: 'market_cap',
      align: 'right',
      sorter: (a, b) => a.market_cap - b.market_cap,
      render: (cap) => formatCurrency(cap),
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <Title level={3} style={{ margin: 0 }}>Market Overview</Title>
        <Input
          placeholder="Search coins..."
          prefix={<SearchOutlined className="text-gray-400" />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
          allowClear
        />
      </div>
      
      <Table 
        columns={columns} 
        dataSource={filteredCoins} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default Market;