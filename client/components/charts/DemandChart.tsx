import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type DemandPoint = {
  day: string; // e.g., Mon, Tue
  sold: number; // actual items sold
  feedback: number; // -1..1 sentiment/intent from student polls
};

interface Props {
  data: DemandPoint[];
  forecastDays?: number;
}

function movingAverage(values: number[], window = 3) {
  if (values.length === 0) return 0;
  const n = Math.min(window, values.length);
  const slice = values.slice(values.length - n);
  return slice.reduce((a, b) => a + b, 0) / n;
}

function buildForecast(data: DemandPoint[], days = 3) {
  const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const soldSeries = data.map((d) => d.sold);
  const out: { name: string; actual?: number; forecast: number }[] = [];
  data.forEach((d) => {
    out.push({
      name: d.day,
      actual: d.sold,
      forecast: Math.round(movingAverage(soldSeries, 3)),
    });
  });
  // simple projection using MA + feedback adjustment
  let lastSold = soldSeries[soldSeries.length - 1] ?? 0;
  for (let i = 0; i < days; i++) {
    const ma = movingAverage(soldSeries, 3);
    const fb = data[data.length - 1]?.feedback ?? 0;
    const next = Math.max(0, Math.round(ma * 0.85 + lastSold * 0.1 + fb * 5));
    out.push({
      name: names[
        (names.indexOf(data[data.length - 1]?.day ?? "Mon") + i + 1) %
          names.length
      ],
      forecast: next,
    });
    soldSeries.push(next);
    lastSold = next;
  }
  return out;
}

export function DemandChart({ data, forecastDays = 3 }: Props) {
  const series = useMemo(
    () => buildForecast(data, forecastDays),
    [data, forecastDays],
  );

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <AreaChart
          data={series}
          margin={{ left: 6, right: 6, top: 8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="actual" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--primary))"
                stopOpacity={0.02}
              />
            </linearGradient>
            <linearGradient id="forecast" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(var(--accent))"
                stopOpacity={0.5}
              />
              <stop
                offset="95%"
                stopColor="hsl(var(--accent))"
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
          <XAxis
            dataKey="name"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              color: "hsl(var(--popover-foreground))",
            }}
          />
          <Area
            type="monotone"
            dataKey="actual"
            name="Actual"
            stroke="hsl(var(--primary))"
            fill="url(#actual)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="forecast"
            name="Forecast"
            stroke="hsl(var(--accent-foreground))"
            fill="url(#forecast)"
            strokeDasharray="5 5"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DemandChart;
