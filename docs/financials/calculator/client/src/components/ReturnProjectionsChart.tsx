import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ReturnProjectionsChartProps {
  data: {
    conservative: {
      year1MarketCap: number;
      year3MarketCap: number;
      returnMultiple: number;
    };
    expected: {
      year1MarketCap: number;
      year3MarketCap: number;
      returnMultiple: number;
    };
    aggressive: {
      year1MarketCap: number;
      year3MarketCap: number;
      returnMultiple: number;
    };
    paradigmShift: {
      year1MarketCap: number;
      year3MarketCap: number;
      returnMultiple: number;
    };
  };
}

export default function ReturnProjectionsChart({ data }: ReturnProjectionsChartProps) {
  const chartData = [
    {
      name: "Conservative",
      year1: data.conservative.returnMultiple,
      year3: data.conservative.returnMultiple,
    },
    {
      name: "Expected",
      year1: data.expected.returnMultiple,
      year3: data.expected.returnMultiple,
    },
    {
      name: "Aggressive",
      year1: data.aggressive.returnMultiple,
      year3: data.aggressive.returnMultiple,
    },
    {
      name: "Paradigm Shift",
      year1: data.paradigmShift.returnMultiple,
      year3: data.paradigmShift.returnMultiple,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" label={{ value: "Return Multiple (x)", angle: -90, position: "insideLeft" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
          formatter={(value) => `${value}x`}
        />
        <Legend />
        <Bar dataKey="year1" fill="#3B82F6" name="Year 1" radius={[8, 8, 0, 0]} />
        <Bar dataKey="year3" fill="#10B981" name="Year 3" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

