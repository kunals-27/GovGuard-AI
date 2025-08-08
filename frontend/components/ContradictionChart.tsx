"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type ChartData = {
  date: string;
  count: number;
};

export default function ContradictionChart({ data }: { data: ChartData[] }) {
  // Return null if there's no data to prevent errors
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl bg-slate-800 p-4 rounded-lg border border-slate-700 mb-8 flex flex-col items-center">
      <h2 className="text-lg font-semibold text-slate-200 mb-4 self-start">
        Contradictions Detected (Last 7 Days)
      </h2>
      <BarChart
        width={700}
        height={250}
        data={data}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
        <YAxis allowDecimals={false} stroke="#94a3b8" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            borderColor: "#334155",
          }}
          labelStyle={{ color: "#cbd5e1" }}
        />
        <Bar dataKey="count" fill="#f43f5e" name="Contradictions" />
      </BarChart>
    </div>
  );
}