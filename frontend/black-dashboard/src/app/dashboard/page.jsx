// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import React from "react";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from "recharts";
// import { DataTable } from "@/components/data-table/data-table";
// import { columns } from "@/components/data-table/columns";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { useFilterStore } from "@/store/filter.store";
// export default function DashboardPage() {
//   const filtersStore = useFilterStore((state) => state.filtersStore);
//   const mutation = useMutation({
//     mutationFn: async (filters) => {
//       const res = await fetch(`http://localhost:5000/api/data`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(filters),
//       });
//       return res.json();
//     },
//   });
//   const { data: jsonData, isLoading: tableLoading, error } = mutation;

//   React.useEffect(() => {
//     mutation.mutate(filtersStore, { retry: false });
//   }, [filtersStore]);
//   if (tableLoading) {
//     return <div>Loading...</div>;
//   }
//   const intensityLikelihoodData = jsonData?.data
//     ? jsonData?.data.map((item, index) => ({
//         name: `Point ${index + 1}`,
//         intensity: item.intensity,
//         likelihood: item.likelihood,
//       }))
//     : [];

//   const relevanceTrendData = jsonData?.data
//     ? jsonData?.data.map((item) => ({
//         year: item.start_year || "N/A",
//         relevance: item.relevance,
//       }))
//     : [];

//   const topicDistribution = jsonData?.data
//     ? jsonData.data.map((item) => ({
//         name: item.topic || "N/A",
//         value: 1,
//       }))
//     : [];

//   const regionWiseData = jsonData?.data
//     ? jsonData.data.map((item) => ({
//         name: item.region || "N/A",
//         value: 1,
//       }))
//     : [];

//   const countryWiseData = jsonData?.data
//     ? jsonData.data.map((item) => ({
//         name: item.country || "N/A",
//         value: 1,
//       }))
//     : [];

//   const pieColors = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];
//   const uniqueTopics = new Set(jsonData?.data?.map((item) => item.topic));
//   const uniqueCountries = new Set(jsonData?.data?.map((item) => item.country));

//   return (
//     <div className="p-6 space-y-6">
//       {/* -------- TOP CARDS -------- */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Total Records</CardTitle>
//           </CardHeader>
//           <CardContent className="text-3xl font-bold">
//             {jsonData?.data?.length || 0}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Active Topics</CardTitle>
//           </CardHeader>
//           <CardContent className="text-3xl font-bold">
//             {uniqueTopics.size || 0}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Countries Covered</CardTitle>
//           </CardHeader>
//           <CardContent className="text-3xl font-bold">
//             {uniqueCountries.size}
//           </CardContent>
//         </Card>
//       </div>

//       {/* -------- CHARTS ROW 1 -------- */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Intensity vs Likelihood */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Intensity vs Likelihood</CardTitle>
//           </CardHeader>
//           <CardContent style={{ height: 300 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={intensityLikelihoodData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="intensity" stroke="#8884d8" />
//                 <Line type="monotone" dataKey="likelihood" stroke="#82ca9d" />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Relevance Trend */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Relevance Trend Over Years</CardTitle>
//           </CardHeader>
//           <CardContent style={{ height: 300 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={relevanceTrendData}>
//                 <XAxis dataKey="year" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="relevance" stroke="#ff7300" />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* -------- CHARTS ROW 2 (PIE + BAR) -------- */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Topic Distribution Pie */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Topic Wise Distribution</CardTitle>
//           </CardHeader>
//           <CardContent style={{ height: 260 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie data={topicDistribution} dataKey="value" outerRadius={90}>
//                   {topicDistribution
//                     ? topicDistribution.map((_, i) => (
//                         <Cell key={i} fill={pieColors[i]} />
//                       ))
//                     : null}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Region Pie Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Region Wise Distribution</CardTitle>
//           </CardHeader>
//           <CardContent style={{ height: 260 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie data={regionWiseData} dataKey="value" outerRadius={90}>
//                   {regionWiseData.map((_, i) => (
//                     <Cell key={i} fill={pieColors[i]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         {/* Country Wise Bar Chart */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Country Wise Data</CardTitle>
//           </CardHeader>
//           <CardContent style={{ height: 260 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={countryWiseData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#8884d8" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* -------- DATA TABLE PLACEHOLDER -------- */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Data Summary Table</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {jsonData && <DataTable columns={columns} data={jsonData?.data} />}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
