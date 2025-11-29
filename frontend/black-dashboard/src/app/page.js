"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { useMutation } from "@tanstack/react-query";
import { useFilterStore } from "@/store/filter.store";

export default function DashboardPage() {
  const filtersStore = useFilterStore((state) => state.filtersStore);
  const mutation = useMutation({
    mutationFn: async (filters) => {
      const res = await fetch(`http://localhost:5000/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });
      return res.json();
    },
  });
  const { data: jsonData, isLoading: tableLoading, error } = mutation;

  React.useEffect(() => {
    mutation.mutate(filtersStore, { retry: false });
  }, [filtersStore]);

  if (tableLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-foreground/60">Loading data...</p>
        </div>
      </div>
    );
  }

  const intensityLikelihoodData = jsonData?.data
    ? jsonData?.data.map((item, index) => ({
        name: `Point ${index + 1}`,
        intensity: item.intensity,
        likelihood: item.likelihood,
      }))
    : [];

  const relevanceTrendData = jsonData?.data
    ? jsonData?.data.map((item) => ({
        year: item.start_year || "N/A",
        relevance: item.relevance,
      }))
    : [];

  const topicDistribution = jsonData?.data
    ? jsonData.data.map((item) => ({
        name: item.topic || "N/A",
        value: 1,
      }))
    : [];

  const regionWiseData = jsonData?.data
    ? jsonData.data.map((item) => ({
        name: item.region || "N/A",
        value: 1,
      }))
    : [];

  const countryWiseData = jsonData?.data
    ? jsonData.data.map((item) => ({
        name: item.country || "N/A",
        value: 1,
      }))
    : [];

  const pieColors = [
    "oklch(0.52 0.15 185)", // Teal
    "oklch(0.65 0.12 264)", // Purple
    "oklch(0.72 0.1 41)", // Yellow
    "oklch(0.42 0.08 30)", // Orange
  ];

  const uniqueTopics = new Set(jsonData?.data?.map((item) => item.topic));
  const uniqueCountries = new Set(jsonData?.data?.map((item) => item.country));

  return (
    <div className="p-6 lg:p-8 max-w-full space-y-6 bg-background min-h-screen text-foreground">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-foreground/60 mt-2">
          Real-time insights and strategic analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground/80">
              Total Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {jsonData?.data?.length || 0}
            </div>
            <p className="text-xs text-foreground/60 mt-2">
              Data points analyzed
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground/80">
              Active Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              {uniqueTopics.size || 0}
            </div>
            <p className="text-xs text-foreground/60 mt-2">Unique categories</p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground/80">
              Countries Covered
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">
              {uniqueCountries.size}
            </div>
            <p className="text-xs text-foreground/60 mt-2">Geographic reach</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-base font-semibold text-foreground">
              Intensity vs Likelihood
            </CardTitle>
            <p className="text-xs text-foreground/60 mt-1">
              Comparative analysis over data points
            </p>
          </CardHeader>
          <CardContent className="pt-4" style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={intensityLikelihoodData}>
                <XAxis dataKey="name" stroke="oklch(0.45 0.02 264)" />
                <YAxis stroke="oklch(0.45 0.02 264)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.15 0 0)",
                    border: "1px solid oklch(0.2 0.02 0)",
                    borderRadius: "6px",
                  }}
                  labelStyle={{ color: "oklch(0.95 0 0)" }}
                />
                <Line
                  type="monotone"
                  dataKey="intensity"
                  stroke="oklch(0.52 0.15 185)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="likelihood"
                  stroke="oklch(0.65 0.12 264)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-base font-semibold text-foreground">
              Relevance Trend
            </CardTitle>
            <p className="text-xs text-foreground/60 mt-1">
              Year-over-year progression
            </p>
          </CardHeader>
          <CardContent className="pt-4" style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={relevanceTrendData}>
                <XAxis dataKey="year" stroke="oklch(0.45 0.02 264)" />
                <YAxis stroke="oklch(0.45 0.02 264)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.15 0 0)",
                    border: "1px solid oklch(0.2 0.02 0)",
                    borderRadius: "6px",
                  }}
                  labelStyle={{ color: "oklch(0.95 0 0)" }}
                />
                <Line
                  type="monotone"
                  dataKey="relevance"
                  stroke="oklch(0.72 0.1 41)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-base font-semibold text-foreground">
              Topic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicDistribution}
                  dataKey="value"
                  outerRadius={90}
                  innerRadius={45}
                >
                  {topicDistribution
                    ? topicDistribution.map((_, i) => (
                        <Cell key={i} fill={pieColors[i % pieColors.length]} />
                      ))
                    : null}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid oklch(0.2 0.02 0)",
                    borderRadius: "6px",
                    color: "oklch(0.95 0 0)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-base font-semibold text-foreground">
              Region Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionWiseData}
                  dataKey="value"
                  outerRadius={90}
                  innerRadius={45}
                >
                  {regionWiseData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid oklch(0.2 0.02 0)",
                    borderRadius: "6px",
                    color: "oklch(0.95 0 0)",
                  }}
                  labelStyle={{
                    color: "oklch(0.95 0 0)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-base font-semibold text-foreground">
              Country Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryWiseData}>
                <XAxis dataKey="name" stroke="oklch(0.45 0.02 264)" />
                <YAxis stroke="oklch(0.45 0.02 264)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.15 0 0)",
                    border: "1px solid oklch(0.2 0.02 0)",
                    borderRadius: "6px",
                    color: "oklch(0.95 0 0)",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="oklch(0.52 0.15 185)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-border bg-card shadow-sm">
        <CardHeader className="pb-4 border-b border-border">
          <CardTitle className="text-base font-semibold text-foreground">
            Data Summary
          </CardTitle>
          <p className="text-xs text-foreground/60 mt-1">
            Detailed records and analytics
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          {jsonData && <DataTable columns={columns} data={jsonData?.data} />}
        </CardContent>
      </Card>
    </div>
  );
}
