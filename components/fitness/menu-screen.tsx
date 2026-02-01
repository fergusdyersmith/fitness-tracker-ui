"use client"

import { Button } from "@/components/ui/button"
import { Screen } from "@/app/page"

type Props = {
  onNavigate: (screen: Screen) => void
  onClose: () => void
}

export default function MenuScreen({ onNavigate, onClose }: Props) {
  const menuItems: { label: string; screen: Screen; color: string }[] = [
    { label: "Settings", screen: "settings", color: "bg-slate-600 hover:bg-slate-700" },
    { label: "Data", screen: "data", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "Analysis", screen: "analysis", color: "bg-purple-600 hover:bg-purple-700" },
    { label: "Goals", screen: "goals", color: "bg-green-600 hover:bg-green-700" },
    { label: "Workouts", screen: "workouts", color: "bg-orange-600 hover:bg-orange-700" },
  ]

  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md">
      <div className="bg-blue-600 text-white p-3 rounded-t-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Menu</h1>
        <Button
          onClick={onClose}
          size="sm"
          variant="ghost"
          className="text-white hover:bg-blue-500 hover:text-white text-lg font-bold"
        >
          X
        </Button>
      </div>

      <div className="p-6 space-y-3">
        {menuItems.map((item) => (
          <Button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`w-full ${item.color} text-white py-6 text-lg`}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
