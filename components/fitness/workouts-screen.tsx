"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  onBack: () => void
  onError: (message: string) => void
}

type Workout = {
  id: number
  name: string
  category: string
  isDefault: boolean
}

export default function WorkoutsScreen({ onBack, onError }: Props) {
  const [workouts, setWorkouts] = useState<Workout[]>([
    { id: 1, name: "Running", category: "Cardio", isDefault: true },
    { id: 2, name: "Cycling", category: "Cardio", isDefault: true },
    { id: 3, name: "Swimming", category: "Cardio", isDefault: true },
    { id: 4, name: "Push-ups", category: "Strength", isDefault: true },
    { id: 5, name: "Squats", category: "Strength", isDefault: true },
    { id: 6, name: "Weights", category: "Strength", isDefault: true },
    { id: 7, name: "Yoga", category: "Flexibility", isDefault: false },
  ])

  const [newWorkoutName, setNewWorkoutName] = useState("")
  const [newCategory, setNewCategory] = useState("")

  const handleAddWorkout = () => {
    if (!newWorkoutName.trim()) {
      onError("Please enter a workout name")
      return
    }
    if (workouts.some((w) => w.name.toLowerCase() === newWorkoutName.toLowerCase())) {
      onError("This workout already exists")
      return
    }

    setWorkouts([
      ...workouts,
      {
        id: Date.now(),
        name: newWorkoutName.trim(),
        category: newCategory || "Custom",
        isDefault: false,
      },
    ])
    setNewWorkoutName("")
    setNewCategory("")
  }

  const handleDelete = (workout: Workout) => {
    if (workout.isDefault) {
      onError("Cannot delete default workouts - they may be referenced in past records")
      return
    }
    setWorkouts(workouts.filter((w) => w.id !== workout.id))
  }

  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md">
      <div className="bg-blue-600 text-white p-3 rounded-t-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Workouts</h1>
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
        {/* Add New Workout */}
        <div className="border border-slate-300 rounded p-3 bg-orange-50">
          <h3 className="font-semibold text-slate-700 mb-2">Add Custom Workout</h3>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-slate-600">Workout Name</Label>
              <Input
                value={newWorkoutName}
                onChange={(e) => setNewWorkoutName(e.target.value)}
                className="mt-1 bg-white"
                placeholder="e.g., Planks"
              />
            </div>
            <div>
              <Label className="text-xs text-slate-600">Category</Label>
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="mt-1 bg-white"
                placeholder="e.g., Core"
              />
            </div>
          </div>
          <Button
            onClick={handleAddWorkout}
            className="w-full mt-2 bg-orange-600 hover:bg-orange-700"
            size="sm"
          >
            Add Workout
          </Button>
        </div>

        {/* Workouts Table */}
        <div className="border border-slate-300 rounded overflow-hidden max-h-64 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 sticky top-0">
              <tr>
                <th className="text-left p-2 border-b">Workout</th>
                <th className="text-left p-2 border-b">Category</th>
                <th className="text-left p-2 border-b">Type</th>
                <th className="text-left p-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout.id} className="border-b last:border-b-0">
                  <td className="p-2 font-medium">{workout.name}</td>
                  <td className="p-2 text-slate-600">{workout.category}</td>
                  <td className="p-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        workout.isDefault
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {workout.isDefault ? "Default" : "Custom"}
                    </span>
                  </td>
                  <td className="p-2">
                    <Button
                      onClick={() => handleDelete(workout)}
                      size="sm"
                      variant={workout.isDefault ? "outline" : "destructive"}
                      className="h-6 text-xs"
                      disabled={workout.isDefault}
                    >
                      {workout.isDefault ? "Protected" : "Delete"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500">
          Default workouts cannot be deleted to maintain data integrity with past records.
        </p>
      </div>
    </div>
  )
}
