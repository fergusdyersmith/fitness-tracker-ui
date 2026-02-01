"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  onBack: () => void
  onError: (message: string) => void
}

type Goal = {
  id: number
  type: "weekly" | "monthly" | "yearly"
  activity: string
  target: number
  unit: string
  current: number
}

export default function GoalsScreen({ onBack, onError }: Props) {
  const [view, setView] = useState<"current" | "new">("current")
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      type: "weekly",
      activity: "Running",
      target: 20,
      unit: "km",
      current: 12,
    },
    {
      id: 2,
      type: "monthly",
      activity: "Push-ups",
      target: 500,
      unit: "reps",
      current: 320,
    },
  ])

  // New goal form
  const [newGoalType, setNewGoalType] = useState<"weekly" | "monthly" | "yearly">("weekly")
  const [newActivity, setNewActivity] = useState("")
  const [newTarget, setNewTarget] = useState("")
  const [newUnit, setNewUnit] = useState("km")

  const handleAddGoal = () => {
    if (!newActivity) {
      onError("Please select an activity")
      return
    }
    const targetNum = parseInt(newTarget)
    if (isNaN(targetNum) || targetNum <= 0) {
      onError("Target must be a positive number")
      return
    }

    setGoals([
      ...goals,
      {
        id: Date.now(),
        type: newGoalType,
        activity: newActivity,
        target: targetNum,
        unit: newUnit,
        current: 0,
      },
    ])
    setNewActivity("")
    setNewTarget("")
    setView("current")
  }

  const handleDeleteGoal = (id: number) => {
    if (goals.length <= 1) {
      onError("You must have at least one goal")
      return
    }
    setGoals(goals.filter((g) => g.id !== id))
  }

  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md">
      <div className="bg-blue-600 text-white p-3 rounded-t-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Goals</h1>
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
        {/* View Toggle */}
        <div className="flex gap-2">
          <Button
            onClick={() => setView("current")}
            variant={view === "current" ? "default" : "outline"}
            className={view === "current" ? "bg-blue-600" : ""}
            size="sm"
          >
            Current Goals
          </Button>
          <Button
            onClick={() => setView("new")}
            variant={view === "new" ? "default" : "outline"}
            className={view === "new" ? "bg-green-600" : ""}
            size="sm"
          >
            Set New Goal
          </Button>
        </div>

        {view === "current" ? (
          <div className="space-y-3">
            {/* Default Goal Notice */}
            <div className="bg-yellow-50 border border-yellow-300 rounded p-2 text-xs text-yellow-700">
              You must always have at least one active goal.
            </div>

            {goals.map((goal) => (
              <div
                key={goal.id}
                className="border border-slate-300 rounded p-3 bg-slate-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        goal.type === "weekly"
                          ? "bg-blue-100 text-blue-700"
                          : goal.type === "monthly"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {goal.type}
                    </span>
                    <h4 className="font-semibold mt-1">{goal.activity}</h4>
                    <p className="text-sm text-slate-600">
                      {goal.current}/{goal.target} {goal.unit}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleDeleteGoal(goal.id)}
                    size="sm"
                    variant="destructive"
                    className="h-7 text-xs"
                  >
                    Delete
                  </Button>
                </div>
                <div className="mt-2 bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {Math.round((goal.current / goal.target) * 100)}% complete
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3 border border-slate-300 rounded p-4 bg-green-50">
            <h3 className="font-semibold text-slate-700">Create New Goal</h3>

            <div>
              <Label className="text-sm text-slate-600">Goal Period</Label>
              <Select
                value={newGoalType}
                onValueChange={(v) => setNewGoalType(v as "weekly" | "monthly" | "yearly")}
              >
                <SelectTrigger className="mt-1 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm text-slate-600">Activity</Label>
              <Select value={newActivity} onValueChange={setNewActivity}>
                <SelectTrigger className="mt-1 bg-white">
                  <SelectValue placeholder="Select activity..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Running">Running</SelectItem>
                  <SelectItem value="Cycling">Cycling</SelectItem>
                  <SelectItem value="Swimming">Swimming</SelectItem>
                  <SelectItem value="Push-ups">Push-ups</SelectItem>
                  <SelectItem value="Squats">Squats</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm text-slate-600">Target</Label>
                <Input
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="mt-1 bg-white"
                  placeholder="e.g., 20"
                />
              </div>
              <div>
                <Label className="text-sm text-slate-600">Unit</Label>
                <Select value={newUnit} onValueChange={setNewUnit}>
                  <SelectTrigger className="mt-1 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="km">km</SelectItem>
                    <SelectItem value="miles">miles</SelectItem>
                    <SelectItem value="minutes">minutes</SelectItem>
                    <SelectItem value="reps">reps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleAddGoal}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Create Goal
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
