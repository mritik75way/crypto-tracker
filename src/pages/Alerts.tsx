import { useEffect, useState } from 'react';
import { Table, Button, Tag, Modal, Form, Select, InputNumber, Typography, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BellOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addAlert, removeAlert, type PriceAlert } from '../features/alerts/alertsSlice';
import { formatCurrency } from '../utils/format';
import { v4 as uuidv4 } from 'uuid';
import { fetchCoins } from '../features/market/marketSlice';

const { Title } = Typography;

interface AlertFormValues {
  coinId: string;
  targetPrice: number;
  condition: 'above' | 'below';
}

const Alerts = () => {
  const dispatch = useAppDispatch();
  const { items: alerts } = useAppSelector((state) => state.alerts);
  const { coins } = useAppSelector((state) => state.market);

  useEffect(() => {
    if (coins.length === 0) {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.length]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddAlert = (values: AlertFormValues) => {
    dispatch(addAlert({
      id: uuidv4(),
      coinId: values.coinId,
      targetPrice: values.targetPrice,
      condition: values.condition,
      isActive: true,
    }));
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns: ColumnsType<PriceAlert> = [
    {
      title: 'Coin',
      dataIndex: 'coinId',
      key: 'coinId',
      render: (coinId: string) => {
        const coin = coins.find((c) => c.id === coinId);
        return <span className="font-semibold capitalize">{coin?.name || coinId}</span>;
      },
    },
    {
      title: 'Condition',
      key: 'condition',
      render: (_, record) => (
        <span>
          <span className="font-medium text-gray-600">
            {record.condition === 'above' ? 'Goes Above' : 'Drops Below'}
          </span>
          <span className="ml-2 font-bold text-blue-600">
            {formatCurrency(record.targetPrice)}
          </span>
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'default'}>
          {isActive ? 'Active' : 'Triggered'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm title="Delete alert?" onConfirm={() => dispatch(removeAlert(record.id))}>
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={3} style={{ margin: 0 }}>Price Alerts</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          Create Alert
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={alerts} 
        rowKey="id"
        locale={{ emptyText: 'No alerts set. Create one to stay updated.' }}
      />

      <Modal
        title="Set Price Alert"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddAlert} form={form}>
          <Form.Item 
            name="coinId" 
            label="Select Coin" 
            rules={[{ required: true, message: 'Please select a coin' }]}
          >
            <Select 
              showSearch
              placeholder="Search coin..."
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={coins.map(c => ({ value: c.id, label: c.name }))}
            />
          </Form.Item>

          <Form.Item 
            name="condition" 
            label="Condition" 
            initialValue="above"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="above">Price goes above</Select.Option>
              <Select.Option value="below">Price drops below</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item 
            name="targetPrice" 
            label="Target Price ($)" 
            rules={[{ required: true, message: 'Please set a price' }]}
          >
            <InputNumber style={{ width: '100%' }} prefix="$" />
          </Form.Item>

          <div className="flex justify-end mt-4">
            <Button type="primary" htmlType="submit" icon={<BellOutlined />}>
              Set Alert
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Alerts;