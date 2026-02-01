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

type WorkoutEntry = {
  id: number
  date: string
  activity: string
  time: number
  reps: number
}

const mockData: WorkoutEntry[] = [
  { id: 1, date: "2026-01-28", activity: "Running", time: 30, reps: 0 },
  { id: 2, date: "2026-01-28", activity: "Push-ups", time: 10, reps: 50 },
  { id: 3, date: "2026-01-27", activity: "Cycling", time: 45, reps: 0 },
  { id: 4, date: "2026-01-26", activity: "Squats", time: 15, reps: 30 },
]

export default function DataScreen({ onBack, onError }: Props) {
  const [year, setYear] = useState("2026")
  const [month, setMonth] = useState("01")
  const [day, setDay] = useState("")
  const [data, setData] = useState<WorkoutEntry[]>(mockData)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTime, setEditTime] = useState("")
  const [editReps, setEditReps] = useState("")

  const filteredData = data.filter((entry) => {
    const entryDate = entry.date
    if (day) {
      return entryDate === `${year}-${month}-${day.padStart(2, "0")}`
    }
    return entryDate.startsWith(`${year}-${month}`)
  })

  const isFutureDate = () => {
    if (!day) return false
    const selectedDate = new Date(`${year}-${month}-${day.padStart(2, "0")}`)
    return selectedDate > new Date()
  }

  const handleEdit = (entry: WorkoutEntry) => {
    setEditingId(entry.id)
    setEditTime(entry.time.toString())
    setEditReps(entry.reps.toString())
  }

  const handleSave = (id: number) => {
    const timeNum = parseInt(editTime)
    const repsNum = parseInt(editReps)

    if (isNaN(timeNum) || isNaN(repsNum)) {
      onError("Time and Reps must be numbers")
      return
    }
    if (timeNum < 0 || repsNum < 0) {
      onError("Values cannot be negative")
      return
    }

    setData(
      data.map((e) =>
        e.id === id ? { ...e, time: timeNum, reps: repsNum } : e
      )
    )
    setEditingId(null)
  }

  const handleDelete = (id: number) => {
    setData(data.filter((e) => e.id !== id))
  }

  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md">
      <div className="bg-blue-600 text-white p-3 rounded-t-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Data</h1>
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
        {/* Time Filters */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <Label className="text-xs text-slate-600">Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-slate-600">Month</Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem
                    key={i + 1}
                    value={(i + 1).toString().padStart(2, "0")}
                  >
                    {new Date(2000, i).toLocaleString("default", {
                      month: "short",
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-slate-600">Day</Label>
            <Input
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="mt-1"
              placeholder="All"
            />
          </div>
        </div>

        {isFutureDate() && (
          <div className="bg-yellow-50 border border-yellow-300 rounded p-3">
            <p className="text-sm text-yellow-700 font-medium">
              Future date selected - Schedule a workout
            </p>
            <Button className="mt-2 bg-yellow-600 hover:bg-yellow-700" size="sm">
              Schedule Workout
            </Button>
          </div>
        )}

        {/* Data Table */}
        <div className="border border-slate-300 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="text-left p-2 border-b">Date</th>
                <th className="text-left p-2 border-b">Activity</th>
                <th className="text-left p-2 border-b">Time</th>
                <th className="text-left p-2 border-b">Reps</th>
                <th className="text-left p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-500">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredData.map((entry) => (
                  <tr key={entry.id} className="border-b last:border-b-0">
                    <td className="p-2">{entry.date}</td>
                    <td className="p-2">{entry.activity}</td>
                    <td className="p-2">
                      {editingId === entry.id ? (
                        <Input
                          value={editTime}
                          onChange={(e) => setEditTime(e.target.value)}
                          className="w-16 h-7 text-xs"
                        />
                      ) : (
                        `${entry.time} min`
                      )}
                    </td>
                    <td className="p-2">
                      {editingId === entry.id ? (
                        <Input
                          value={editReps}
                          onChange={(e) => setEditReps(e.target.value)}
                          className="w-16 h-7 text-xs"
                        />
                      ) : (
                        entry.reps
                      )}
                    </td>
                    <td className="p-2">
                      {editingId === entry.id ? (
                        <Button
                          onClick={() => handleSave(entry.id)}
                          size="sm"
                          className="h-6 text-xs bg-green-600"
                        >
                          Save
                        </Button>
                      ) : (
                        <div className="flex gap-1">
                          <Button
                            onClick={() => handleEdit(entry)}
                            size="sm"
                            variant="outline"
                            className="h-6 text-xs"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(entry.id)}
                            size="sm"
                            variant="destructive"
                            className="h-6 text-xs"
                          >
                            Del
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
