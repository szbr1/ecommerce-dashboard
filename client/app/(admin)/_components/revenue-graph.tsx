'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { useGetSalesByYearQuery } from '@/(config)/api/ordersApi';

export const description = 'A mixed bar chart';

export function RevenueGraph() {
  const { data: chartData } = useGetSalesByYearQuery();
  const chartConfig = {
    totalAmount: {
      label: 'totalAmount',
      color: 'var(--color-chart-3)',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData && chartData}
        layout="vertical"
        margin={{
          left: 0,
        }}
      >
        <YAxis
          dataKey="year"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <XAxis dataKey="totalAmount" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          className="opacity-80"
          dataKey="totalAmount"
          layout="vertical"
          fill="var(--color-chart-3)"
          radius={5}
        />
      </BarChart>
    </ChartContainer>
  );
}
