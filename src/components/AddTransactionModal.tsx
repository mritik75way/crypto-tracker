import { Modal, Form, Select, InputNumber, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTransaction } from '../features/portfolio/portfolioSlice';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  coinId: string;
  quantity: number;
  pricePerCoin: number;
}

const AddTransactionModal = ({ open, onClose }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { coins } = useAppSelector((state) => state.market);

  const handleSubmit = (values: FormValues) => {
    dispatch(addTransaction({
      id: uuidv4(),
      coinId: values.coinId,
      quantity: values.quantity,
      pricePerCoin: values.pricePerCoin,
      date: new Date().toISOString(),
    }));
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Asset"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item 
          name="coinId" 
          label="Select Coin" 
          rules={[{ required: true, message: 'Please select a coin' }]}
        >
          <Select 
            showSearch
            placeholder="Search for a coin"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={coins.map(coin => ({
              value: coin.id,
              label: coin.name,
            }))}
          />
        </Form.Item>

        <Form.Item 
          name="quantity" 
          label="Quantity" 
          rules={[{ required: true, message: 'Please enter amount' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} step={0.0001} />
        </Form.Item>

        <Form.Item 
          name="pricePerCoin" 
          label="Buy Price per Coin ($)" 
          rules={[{ required: true, message: 'Please enter price' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} prefix="$" />
        </Form.Item>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" htmlType="submit">Add Asset</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddTransactionModal;