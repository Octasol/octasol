"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useMemo } from "react";

export const description = "A bar chart with a custom label";

interface DataObject {
  githubId?: string;
  stars?: number;
  forks?: number;
  forkedRepos?: number;
  originalRepos?: number;
  followers?: number;
  totalCommits?: number;
  repositoriesContributedTo?: number;
  pullRequests?: number;
  mergedPullRequests?: number;
  totalIssues?: number;
}

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
  }, [transformedData]);

  return (
    <Card className="bg-transparent !border-0 w-full">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
        {/* <CardDescription>Data visualization for user statistics</CardDescription> */}
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
              >
                {/* <LabelList
                  dataKey="value"
                  position="left"
                  offset={-25}
                  className="fill-foreground"
                  fontSize={10} // Smaller label font size
                /> */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing data insights for the provided statistics
        </div>
      </CardFooter> */}
    </Card>
  );
}
