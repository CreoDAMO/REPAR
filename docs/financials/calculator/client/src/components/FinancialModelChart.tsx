import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface FinancialModelChartProps {
  data: {
    legalEnforcementPercent: number;
    securityOperationsPercent: number;
    eliteCoreTeamPercent: number;
    aiInfrastructurePercent: number;
    contingencyReservePercent: number;
  };
}

export default function FinancialModelChart({ data }: FinancialModelChartProps) {
  const chartData = [
    {
      name: "Legal & Enforcement",
      value: data.legalEnforcementPercent * 100,
    },
    {
      name: "Security Operations",
      value: data.securityOperationsPercent * 100,
    },
    {
      name: "Elite Core Team",
      value: data.eliteCoreTeamPercent * 100,
    },
    {
      name: "AI Infrastructure",
      value: data.aiInfrastructurePercent * 100,
    },
    {
      name: "Contingency Reserve",
      value: data.contingencyReservePercent * 100,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
          formatter={(value: any) => `${Number(value).toFixed(2)}%`}
        />
        <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

