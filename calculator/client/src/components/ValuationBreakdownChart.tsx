import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface ValuationBreakdownChartProps {
  data: {
    blockchainValuePercent: number;
    aiProtocolValuePercent: number;
    nativeCoinValuePercent: number;
    networkEffectsPercent: number;
  };
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

export default function ValuationBreakdownChart({ data }: ValuationBreakdownChartProps) {
  const chartData = [
    {
      name: "Blockchain Infrastructure",
      value: data.blockchainValuePercent * 100,
    },
    {
      name: "AI Protocol Value",
      value: data.aiProtocolValuePercent * 100,
    },
    {
      name: "Native Coin Economics",
      value: data.nativeCoinValuePercent * 100,
    },
    {
      name: "Network Effects",
      value: data.networkEffectsPercent * 100,
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
        <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

