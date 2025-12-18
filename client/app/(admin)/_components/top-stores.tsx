"use client"

import { Pie, PieChart } from "recharts"


import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A pie chart with a label"

const chartData = [
  { store: "chrome", sales: 275, fill: "var(--color-chrome)" },
  { store: "safari", sales: 200, fill: "var(--color-safari)" },
  { store: "firefox", sales: 187, fill: "var(--color-firefox)" },
  { store: "edge", sales: 173, fill: "var(--color-edge)" },
  { store: "other", sales: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  sales: {
    label: "sales",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function StoresSalesChart() {
  return (
    <div className="h-full w-full">

    
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
          >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="sales" label nameKey="store" />
          </PieChart>
        </ChartContainer>
          </div>

  )
}
