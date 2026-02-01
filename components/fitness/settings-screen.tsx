"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/app/page"

type Props = {
  user: User | null
  onUpdateUser: (user: User) => void
  onBack: () => void
}

export default function SettingsScreen({ user, onUpdateUser, onBack }: Props) {
  if (!user) return null

  const handleUpdate = (field: keyof User, value: string) => {
    onUpdateUser({ ...user, [field]: value })
  }

  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md">
      <div className="bg-blue-600 text-white p-3 rounded-t-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Settings</h1>
        <Button
          onClick={onBack}
          size="sm"
          variant="ghost"
          className="text-white hover:bg-blue-500 hover:text-white"
        >
          Back
        </Button>
      </div>

      <div className="p-6 space-y-4">
        <h2 className="font-semibold text-slate-700">User Profile</h2>

        <div className="space-y-3">
          {/* Non-editable fields */}
          <div>
            <Label className="text-slate-600">Username:</Label>
            <Input
              value={user.username}
              disabled
              className="mt-1 bg-slate-100 border-slate-300"
            />
          </div>

          <div>
            <Label className="text-slate-600">Join Date:</Label>
            <Input
              value={user.joinDate}
              disabled
              className="mt-1 bg-slate-100 border-slate-300"
            />
          </div>

          {/* Editable fields - highlighted in orange */}
          <div>
            <Label className="text-orange-600 font-medium">
              Gender (editable):
            </Label>
            <Input
              value={user.gender}
              onChange={(e) => handleUpdate("gender", e.target.value)}
              className="mt-1 border-orange-300 focus:border-orange-500"
              placeholder="Enter gender"
            />
          </div>

          <div>
            <Label className="text-orange-600 font-medium">
              Height (editable):
            </Label>
            <Input
              value={user.height}
              onChange={(e) => handleUpdate("height", e.target.value)}
              className="mt-1 border-orange-300 focus:border-orange-500"
              placeholder="e.g., 175 cm"
            />
          </div>

          <div>
            <Label className="text-orange-600 font-medium">
              Start Weight (editable):
            </Label>
            <Input
              value={user.startWeight}
              onChange={(e) => handleUpdate("startWeight", e.target.value)}
              className="mt-1 border-orange-300 focus:border-orange-500"
              placeholder="e.g., 70 kg"
            />
          </div>

          <div>
            <Label className="text-orange-600 font-medium">
              Password (editable):
            </Label>
            <Input
              type="password"
              value={user.password}
              onChange={(e) => handleUpdate("password", e.target.value)}
              className="mt-1 border-orange-300 focus:border-orange-500"
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Fields in <span className="text-orange-600">orange</span> can be edited.
          </p>
        </div>
      </div>
    </div>
  )
}
