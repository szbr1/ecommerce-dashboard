"use client"


import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useGetSalesByMonthQuery } from "@/(config)/api/ordersApi"

export const description = "A linear area chart"



export function PaymentChart() {
  
  const {data: chartData} = useGetSalesByMonthQuery();


  const chartConfig = {
  totalAmount: {
    label: "totalAmount",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig
  
  
  return (
   
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData && chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="totalAmount"
              type="linear"
              fill="var(--color-totalAmount)"
              fillOpacity={0.4}
              stroke="var(--color-totalAmount)"
            />
          </AreaChart>
        </ChartContainer>
  )
}
