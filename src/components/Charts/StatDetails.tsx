"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useMemo } from "react";
import { DataObject } from "@/lib/types";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#3298c7",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "blue",
  },
} satisfies ChartConfig;

interface Props {
  stats: DataObject;
}

export function StatDetails(props: Props) {
  const transformedData = useMemo(() => {
    return Object.entries(props.stats)
      .filter(([key]) => key !== "githubId")
      .map(([key, value]) => ({
        label: key,
        value: value || 0,
      }));
  }, [props.stats]);

  useEffect(() => {
    console.log("Transformed Data:", transformedData);
    console.log(props);
  }, [transformedData, props]);

  return (
    <Card className="bg-transparent !border-0 w-full">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent className=" !p-0 flex w-full m-auto ">
        <ChartContainer config={chartConfig} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={transformedData}
              layout="vertical"
              barSize={50}
              barGap={50}
            >
              <CartesianGrid horizontal={true} />
              <YAxis
                dataKey="label"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={5}
                width={70}
                tickFormatter={(value) =>
                  value.length > 8 ? `${value.slice(0, 8)}...` : value
                }
                style={{ fontSize: "10px", overflow: "hidden" }}
              />
              <XAxis type="number" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="value"
                layout="vertical"
                fill="var(--color-desktop)"
                radius={12}
              ></Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
