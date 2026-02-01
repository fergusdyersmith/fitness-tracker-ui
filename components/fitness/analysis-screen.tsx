"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

type Props = {
  onBack: () => void
}

export default function AnalysisScreen({ onBack }: Props) {
  const [selectedWorkout, setSelectedWorkout] = useState("running")

  // Mock data for the "graph"
  const graphData = [
    { week: "W1", value: 20 },
    { week: "W2", value: 35 },
    { week: "W3", value: 30 },
    { week: "W4", value: 50 },
    { week: "W5", value: 45 },
    { week: "W6", value: 65 },
  ]

  const maxValue = Math.max(...graphData.map((d) => d.value))

  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md">
      <div className="bg-blue-600 text-white p-3 rounded-t-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Analysis</h1>
        <Button
          onClick={onBack}
          size="sm"
          variant="ghost"
          className="text-white hover:bg-blue-500 hover:text-white"
        >
          Back
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {/* Workout Selector */}
        <div>
          <Label className="text-sm text-slate-600">Select Workout</Label>
          <Select value={selectedWorkout} onValueChange={setSelectedWorkout}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="running">Running</SelectItem>
              <SelectItem value="cycling">Cycling</SelectItem>
              <SelectItem value="pushups">Push-ups</SelectItem>
              <SelectItem value="squats">Squats</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Simple Bar Graph */}
        <div className="border border-slate-300 rounded p-4 bg-slate-50">
          <h3 className="font-semibold text-slate-700 mb-3 capitalize">
            {selectedWorkout} - Weekly Progress
          </h3>

          <div className="flex items-end justify-between h-40 gap-2">
            {graphData.map((point) => (
              <div key={point.week} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-blue-500 rounded-t transition-all duration-300"
                  style={{
                    height: `${(point.value / maxValue) * 120}px`,
                  }}
                ></div>
                <span className="text-xs text-slate-600 mt-1">{point.week}</span>
              </div>
            ))}
          </div>

          <div className="mt-2 text-xs text-slate-500 text-center">
            Time (minutes) per week
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="border border-slate-300 rounded p-3 text-center bg-green-50">
            <p className="text-2xl font-bold text-green-600">+44%</p>
            <p className="text-xs text-slate-600">vs Last Period</p>
          </div>
          <div className="border border-slate-300 rounded p-3 text-center bg-blue-50">
            <p className="text-2xl font-bold text-blue-600">245</p>
            <p className="text-xs text-slate-600">Total Minutes</p>
          </div>
          <div className="border border-slate-300 rounded p-3 text-center bg-purple-50">
            <p className="text-2xl font-bold text-purple-600">41</p>
            <p className="text-xs text-slate-600">Avg/Week</p>
          </div>
        </div>

        {/* Trend indicator */}
        <div className="bg-green-50 border border-green-300 rounded p-3 flex items-center gap-2">
          <span className="text-green-600 text-xl">↑</span>
          <div>
            <p className="font-medium text-green-700">Trending Up!</p>
            <p className="text-xs text-green-600">
              You&apos;re improving week over week. Keep it up!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
