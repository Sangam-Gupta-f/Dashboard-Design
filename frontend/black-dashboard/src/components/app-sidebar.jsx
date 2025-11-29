"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
} from "./ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "@/store/filter.store";

export function AppSidebar() {
  const { filtersStore, setFilter, resetFilters } = useFilterStore();
  const { data: filters } = useQuery({
    queryKey: ["filters"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/filters`);
      return res.json();
    },
  });

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar px-4 py-4">
        <h2 className="text-base font-semibold text-sidebar-foreground tracking-tight">
          Filters
        </h2>
        <p className="text-xs text-sidebar-foreground/60 mt-1">
          Refine your analysis
        </p>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full px-3">
          <SidebarGroup className="space-y-4">
            <SidebarGroupLabel className="text-xs uppercase tracking-widest font-semibold text-sidebar-foreground/70">
              Date Range
            </SidebarGroupLabel>
            <Select
              onValueChange={(value) => setFilter("start_year", value)}
              value={filtersStore.start_year}
            >
              <SelectTrigger className="h-9 border border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground focus:ring-sidebar-primary">
                <SelectValue placeholder="Start year" />
              </SelectTrigger>
              <SelectContent>
                {filters?.data?.start_year?.map((year, i) => (
                  <SelectItem key={i} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => setFilter("end_year", value)}
              value={filtersStore.end_year}
            >
              <SelectTrigger className="h-9 border border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground focus:ring-sidebar-primary">
                <SelectValue placeholder="End year" />
              </SelectTrigger>
              <SelectContent>
                {filters?.data?.end_year?.map((year, i) => (
                  <SelectItem key={i} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroup>

          <SidebarGroup className="space-y-4">
            <SidebarGroupLabel className="text-xs uppercase tracking-widest font-semibold text-sidebar-foreground/70">
              Categories
            </SidebarGroupLabel>
            <Select
              onValueChange={(value) => setFilter("topic", value)}
              value={filtersStore.topic}
            >
              <SelectTrigger className="h-9 border border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground focus:ring-sidebar-primary">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                {filters?.data?.topics?.map((topic, i) => (
                  <SelectItem key={i} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => setFilter("sector", value)}
              value={filtersStore.sector}
            >
              <SelectTrigger className="h-9 border border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground focus:ring-sidebar-primary">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                {filters?.data?.sector?.map((sector, i) => (
                  <SelectItem key={i} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroup>

          <SidebarGroup className="space-y-4">
            <SidebarGroupLabel className="text-xs uppercase tracking-widest font-semibold text-sidebar-foreground/70">
              Geography
            </SidebarGroupLabel>
            <Select
              onValueChange={(value) => setFilter("region", value)}
              value={filtersStore.region}
            >
              <SelectTrigger className="h-9 border border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground focus:ring-sidebar-primary">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                {filters?.data?.region?.map((region, i) => (
                  <SelectItem key={i} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => setFilter("country", value)}
              value={filtersStore.country}
            >
              <SelectTrigger className="h-9 border border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground focus:ring-sidebar-primary">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {filters?.data?.country?.map((country, i) => (
                  <SelectItem key={i} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => setFilter("city", value)}
              value={filtersStore.city}
            >
              <SelectTrigger className="h-9 border border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground focus:ring-sidebar-primary">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                {filters?.data?.city?.map((city, i) => (
                  <SelectItem key={i} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroup>

          <SidebarGroup className="space-y-4">
            <SidebarGroupLabel className="text-xs uppercase tracking-widest font-semibold text-sidebar-foreground/70">
              Frameworks
            </SidebarGroupLabel>
            <Select
              onValueChange={(value) => setFilter("pestle", value)}
              value={filtersStore.pestle}
            >
              <SelectTrigger className="h-9 border border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground focus:ring-sidebar-primary">
                <SelectValue placeholder="PESTLE" />
              </SelectTrigger>
              <SelectContent>
                {filters?.data?.pestle?.map((pest, i) => (
                  <SelectItem key={i} value={pest}>
                    {pest}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => setFilter("swot", value)}
              value={filtersStore.swot}
            >
              <SelectTrigger className="h-9 border border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground focus:ring-sidebar-primary">
                <SelectValue placeholder="SWOT" />
              </SelectTrigger>
              <SelectContent>
                {filters?.data?.swot?.map((swot, i) => (
                  <SelectItem key={i} value={swot}>
                    {swot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => setFilter("source", value)}
              value={filtersStore.source}
            >
              <SelectTrigger className="h-9 border border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground focus:ring-sidebar-primary">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                {filters?.data?.source?.map((source, i) => (
                  <SelectItem key={i} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroup>

          <SidebarGroup className="space-y-5">
            <SidebarGroupLabel className="text-xs uppercase tracking-widest font-semibold text-sidebar-foreground/70">
              Metrics
            </SidebarGroupLabel>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-sidebar-foreground/80 block mb-2">
                  Likelihood
                </label>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setFilter("likelihood", value)}
                  className="bg-sidebar-accent"
                />
                <p className="text-xs text-sidebar-foreground/60 mt-1">
                  {filtersStore.likelihood?.[0] || 50}%
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-sidebar-foreground/80 block mb-2">
                  Relevance
                </label>
                <Slider
                  defaultValue={[40]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setFilter("relevance", value)}
                  className="bg-sidebar-accent"
                />
                <p className="text-xs text-sidebar-foreground/60 mt-1">
                  {filtersStore.relevance?.[0] || 40}%
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-sidebar-foreground/80 block mb-2">
                  Intensity
                </label>
                <Slider
                  defaultValue={[60]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setFilter("intensity", value)}
                  className="bg-sidebar-accent"
                />
                <p className="text-xs text-sidebar-foreground/60 mt-1">
                  {filtersStore.intensity?.[0] || 60}%
                </p>
              </div>
            </div>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-sidebar px-4 py-4">
        <p className="text-xs text-sidebar-foreground/60">
          <span className="font-medium text-sidebar-foreground/80">
            BlackCoffers
          </span>{" "}
          Analytics © 2025
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
