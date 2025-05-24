import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ReposInYear({ repoYears, repoCreationData }) {
  // Combine years and data into one array of objects for Recharts
  const chartData = repoYears.map((year, index) => ({
    year,
    repositories: repoCreationData[index],
  }));

  return (
    <>
      {/* Number of Repos in which year */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Repositories Created Per Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="repositories" fill="#10b981" name="Repositories" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
