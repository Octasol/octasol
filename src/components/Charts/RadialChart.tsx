"use client";

import { useEffect } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface RadarObject {
  githubUsername?: string;
  githubPoints?: number;
  hackerrankPoints?: number;
  gfgPoints?: number;
  codechefPoints?: number;
  leetcodePoints?: number;
  superteamEarnPoints?: number;
}

interface Props {
  stats: RadarObject;
}

const convertToChartData = (stats: RadarObject) => {
  return [
    { platform: "GitHub", points: stats.githubPoints ?? 0 },
    { platform: "HackerRank", points: stats.hackerrankPoints ?? 0 },
    { platform: "GeeksforGeeks", points: stats.gfgPoints ?? 0 },
    { platform: "CodeChef", points: stats.codechefPoints ?? 0 },
    { platform: "LeetCode", points: stats.leetcodePoints ?? 0 },
    { platform: "SuperteamEarn", points: stats.superteamEarnPoints ?? 0 },
  ];
};

const convertToBarChartData = (stats: RadarObject) => {
  return [
    { name: "GitHub", points: stats.githubPoints ?? 0 },
    { name: "HackerRank", points: stats.hackerrankPoints ?? 0 },
    { name: "GeeksforGeeks", points: stats.gfgPoints ?? 0 },
    { name: "CodeChef", points: stats.codechefPoints ?? 0 },
    { name: "LeetCode", points: stats.leetcodePoints ?? 0 },
    { name: "SuperteamEarn", points: stats.superteamEarnPoints ?? 0 },
  ];
};

const chartConfig = {
  points: {
    label: "Points",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RadialChart(props: Props) {
  const chartData = convertToChartData(props.stats);
  const barChartData = convertToBarChartData(props.stats);

  const shouldRenderBarChart =
    (props.stats.githubPoints ?? 0) > 0 &&
    (props.stats.hackerrankPoints ?? 0) === 0 &&
    (props.stats.gfgPoints ?? 0) === 0 &&
    (props.stats.codechefPoints ?? 0) === 0 &&
    (props.stats.leetcodePoints ?? 0) === 0 &&
    (props.stats.superteamEarnPoints ?? 0) === 0;

  return (
    <Card className="bg-transparent !border-0">
      <CardHeader className="items-center pb-4">
        <CardTitle>Total Stats</CardTitle>
      </CardHeader>
      <CardContent className="!p-0">
        <ChartContainer config={chartConfig} className="aspect-video mx-auto">
          {shouldRenderBarChart ? (
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="points" fill="blue" />
            </BarChart>
          ) : (
            <RadarChart data={chartData} outerRadius="70%">
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="platform" />
              <PolarGrid />
              <Radar
                name="Points"
                dataKey="points"
                fill="blue"
                fillOpacity={0.6}
              />
            </RadarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
