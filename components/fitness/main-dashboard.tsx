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
import { User } from "@/app/page"

type Props = {
  user: User | null
  onOpenMenu: () => void
  onError: (message: string) => void
}

export default function MainDashboard({ user, onOpenMenu, onError }: Props) {
  const [activity, setActivity] = useState("")
  const [time, setTime] = useState("")
  const [reps, setReps] = useState("")

  const handleLogWorkout = () => {
    if (!activity) {
      onError("Please select an activity type")
      return
    }
    const timeNum = parseInt(time)
    const repsNum = parseInt(reps)
    if (time && isNaN(timeNum)) {
      onError("Time must be a number")
      return
    }
    if (reps && isNaN(repsNum)) {
      onError("Reps must be a number")
      return
    }
    if (timeNum < 0 || repsNum < 0) {
      onError("Values cannot be negative")
      return
    }
    // Success - would save to database
    setActivity("")
    setTime("")
    setReps("")
    alert("Workout logged!")
  }

  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md">
      <div className="bg-blue-600 text-white p-3 rounded-t-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Fitness Tracker</h1>
        <Button
          onClick={onOpenMenu}
          size="sm"
          className="bg-blue-500 hover:bg-blue-400 text-white"
        >
          Menu
        </Button>
      </div>

      <div className="p-4 space-y-4">
        <p className="text-slate-600 text-sm">
          Welcome back, <span className="font-semibold">{user?.username}</span>!
        </p>

        {/* Top Row - Progress & Goals */}
        <div className="grid grid-cols-2 gap-4">
          {/* Progress Summary */}
          <div className="border border-slate-300 rounded p-3 bg-slate-50">
            <h3 className="font-semibold text-slate-700 text-sm mb-2">
              Progress Summary
            </h3>
            <div className="text-center py-3">
              <span className="text-3xl font-bold text-green-600">+12%</span>
              <p className="text-xs text-slate-500 mt-1">vs. last month</p>
            </div>
          </div>

          {/* Goals */}
          <div className="border border-slate-300 rounded p-3 bg-slate-50">
            <h3 className="font-semibold text-slate-700 text-sm mb-2">
              Active Goal
            </h3>
            <div className="text-center py-2">
              <p className="text-sm font-medium text-slate-700">Run 20km</p>
              <p className="text-xs text-slate-500">Weekly Goal</p>
              <div className="mt-2 bg-slate-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">12/20 km</p>
            </div>
          </div>
        </div>

        {/* Quick Input */}
        <div className="border border-slate-300 rounded p-4 bg-yellow-50">
          <h3 className="font-semibold text-slate-700 mb-3">
            Log Workout
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs text-slate-600">Activity</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="mt-1 bg-white">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="cycling">Cycling</SelectItem>
                  <SelectItem value="swimming">Swimming</SelectItem>
                  <SelectItem value="pushups">Push-ups</SelectItem>
                  <SelectItem value="squats">Squats</SelectItem>
                  <SelectItem value="weights">Weights</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-slate-600">Time (min)</Label>
              <Input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 bg-white"
                placeholder="0"
              />
            </div>
            <div>
              <Label className="text-xs text-slate-600">Reps</Label>
              <Input
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="mt-1 bg-white"
                placeholder="0"
              />
            </div>
          </div>
          <Button
            onClick={handleLogWorkout}
            className="w-full mt-3 bg-green-600 hover:bg-green-700"
          >
            Log Workout
          </Button>
        </div>

        {/* Schedule */}
        <div className="border border-slate-300 rounded p-3 bg-blue-50">
          <h3 className="font-semibold text-slate-700 text-sm mb-2">
            Upcoming Schedule
          </h3>
          <div className="flex items-center justify-between bg-white p-2 rounded border border-slate-200">
            <div>
              <p className="font-medium text-sm">Morning Run</p>
              <p className="text-xs text-slate-500">Tomorrow, 7:00 AM</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              30 min
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
