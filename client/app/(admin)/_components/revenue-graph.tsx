"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart"

const chartData = [
  { Year: "2020", Revenue: 186 },
  { Year: "2021", Revenue: 305 },
  { Year: "2022", Revenue: 237 },
  { Year: "2023", Revenue: 73 },
  { Year: "2024", Revenue: 209 },
  { Year: "2025", Revenue: 214 },
]

const chartConfig = {
  Revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

/**
 * A default bar chart with Revenue data 
 * The chart is contained within a <ChartContainer /> component.
 * The chart displays a single bar representing Revenue.
 * The x-axis displays the years.
 * The chart does not display grid lines, axis lines, or tick lines.
 * The chart displays a tooltip with the Revenue value.
 */


export function RevenueGraph() {
  return (
    
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="Revenue" fill="var(--color-Revenue)" radius={8} />
          </BarChart>
        </ChartContainer>
  )
}
