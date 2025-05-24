import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function CommitsRepo({ selectedRepo, labels, commits }) {
  if (commits.length === 0) return null;

  // Transform the data for Recharts
  const chartData = labels.map((label, index) => ({
    date: label,
    commits: commits[index],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commits in: {selectedRepo} Repository</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`Commits: ${value}`, ""]} />
              <Bar dataKey="commits" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
