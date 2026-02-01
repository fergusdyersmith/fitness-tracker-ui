"use client"

import { Button } from "@/components/ui/button"

type Props = {
  message: string
  onRetry: () => void
  onAddWorkout: () => void
  onMainMenu: () => void
}

export default function ErrorScreen({
  message,
  onRetry,
  onAddWorkout,
  onMainMenu,
}: Props) {
  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md">
      <div className="bg-red-600 text-white p-3 rounded-t-md">
        <h1 className="text-xl font-bold text-center">Error</h1>
      </div>

      <div className="p-6 space-y-4">
        <div className="bg-red-50 border border-red-300 rounded p-4 text-center">
          <span className="text-4xl">⚠️</span>
          <p className="mt-2 font-semibold text-red-700">Invalid Input</p>
          <p className="text-sm text-red-600 mt-1">{message}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-slate-600 font-medium">What would you like to do?</p>

          <Button
            onClick={onRetry}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Go Back & Correct Input
          </Button>

          <Button
            onClick={onAddWorkout}
            variant="outline"
            className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
          >
            Add Missing Workout Type
          </Button>

          <Button
            onClick={onMainMenu}
            variant="outline"
            className="w-full bg-transparent"
          >
            Return to Main Menu
          </Button>
        </div>
      </div>
    </div>
  )
}
