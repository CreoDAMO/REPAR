import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface RevenueStreamsChartProps {
  data: {
    transactionFeesPercent?: number;
    validatorEconomicsPercent?: number;
    crossChainBridgesPercent?: number;
    justiceEnforcementPercent?: number;
  };
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export default function RevenueStreamsChart({ data }: RevenueStreamsChartProps) {
  const chartData = [
    {
      name: "Transaction Fees",
      value: (data.transactionFeesPercent || 0) * 100,
    },
    {
      name: "Validator Economics",
      value: (data.validatorEconomicsPercent || 0) * 100,
    },
    {
      name: "Cross-Chain Bridges",
      value: (data.crossChainBridgesPercent || 0) * 100,
    },
    {
      name: "Justice Enforcement",
      value: (data.justiceEnforcementPercent || 0) * 100,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: any) => `${Number(value).toFixed(2)}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

