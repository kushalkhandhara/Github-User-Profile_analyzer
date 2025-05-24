"use client"

import React from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const COLORS = [
  "#f87171",
  "#fbbf24",
  "#34d399",
  "#60a5fa",
  "#a78bfa",
  "#f472b6",
  "#fb923c",
  "#4ade80",
  "#818cf8",
  "#facc15",
]

export default function LanguagesRepo({ languages, selectedRepo }) {
  const total = Object.values(languages).reduce((acc, val) => acc + val, 0)

  const languageData = Object.entries(languages).map(([key, value]) => ({
    name: key,
    value,
    percentage: ((value / total) * 100).toFixed(1), // format to 1 decimal place
  }))

  if (!languageData.length) return null

  return (
    <Card className="flex flex-col w-full py-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Language Breakdown</CardTitle>
        <br />
        <CardDescription>Repository: {selectedRepo}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0 flex items-center justify-center">
        <div className="h-[450px] w-full mx-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={languageData}
                dataKey="value"
                nameKey="name"
                outerRadius="80%"
               
              >
                {languageData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => {
                  const percent = (
                    (value / total) *
                    100
                  ).toFixed(1)
                  return [`${percent}%`, name]
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
