import { useEffect, useState } from "react";
import { Table, Button, Typography, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCoins } from "../features/market/marketSlice";
import { removeTransaction } from "../features/portfolio/portfolioSlice";
import AddTransactionModal from "../components/AddTransactionModal";
import { formatCurrency } from "../utils/format";
import { type Transaction } from "../types/portfolio";

const { Title } = Typography;

interface PortfolioItem extends Transaction {
  coinName: string;
  currentPrice: number;
  totalValue: number;
  profitLoss: number;
}

const Portfolio = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { transactions } = useAppSelector((state) => state.portfolio);
  const { coins } = useAppSelector((state) => state.market);

  useEffect(() => {
    if (coins.length === 0) {
      dispatch(fetchCoins());
    }
  }, [dispatch, coins.length]);

  const tableData: PortfolioItem[] = transactions.map((t) => {
    const currentCoin = coins.find((c) => c.id === t.coinId);
    const currentPrice = currentCoin?.current_price || 0;
    const totalValue = t.quantity * currentPrice;
    const initialInvestment = t.quantity * t.pricePerCoin;
    const profitLoss = totalValue - initialInvestment;

    return {
      ...t,
      coinName: currentCoin?.name || t.coinId,
      currentPrice,
      totalValue,
      profitLoss,
    };
  });

  const columns: ColumnsType<PortfolioItem> = [
    {
      title: "Asset",
      dataIndex: "coinName",
      key: "coinName",
      className: "font-semibold",
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Buy Price",
      dataIndex: "pricePerCoin",
      key: "pricePerCoin",
      render: (val: number) => formatCurrency(val),
    },
    {
      title: "Current Value",
      dataIndex: "totalValue",
      key: "totalValue",
      render: (val: number) => (
        <span className="font-medium">{formatCurrency(val)}</span>
      ),
    },
    {
      title: "Profit/Loss",
      dataIndex: "profitLoss",
      key: "profitLoss",
      render: (val: number) => (
        <span className={val >= 0 ? "text-green-600" : "text-red-600"}>
          {val > 0 ? "+" : ""}
          {formatCurrency(val)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete asset?"
          onConfirm={() => dispatch(removeTransaction(record.id))}
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Title level={3} style={{ margin: 0 }}>
          My Portfolio
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Asset
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        locale={{
          emptyText: "No assets found. Add a transaction to get started.",
        }}
      />

      <AddTransactionModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Portfolio;
