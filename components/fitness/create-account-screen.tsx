"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/app/page"

type Props = {
  onAccountCreated: (user: User) => void
  onBack: () => void
}

export default function CreateAccountScreen({
  onAccountCreated,
  onBack,
}: Props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleCreate = () => {
    if (username && password && password === confirmPassword) {
      onAccountCreated({
        username,
        password,
        gender: "",
        height: "",
        startWeight: "",
        joinDate: new Date().toLocaleDateString(),
      })
    }
  }

  return (
    <div className="bg-white border-2 border-slate-300 rounded-lg shadow-md">
      <div className="bg-blue-600 text-white p-3 rounded-t-md">
        <h1 className="text-xl font-bold text-center">Fitness Tracker</h1>
      </div>

      <div className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-center text-slate-700">
          Create Account
        </h2>

        <div className="space-y-3">
          <div>
            <Label htmlFor="new-username" className="text-slate-600">
              Username:
            </Label>
            <Input
              id="new-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 border-slate-300"
              placeholder="Choose a username"
            />
          </div>

          <div>
            <Label htmlFor="new-password" className="text-slate-600">
              Password:
            </Label>
            <Input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 border-slate-300"
              placeholder="Choose a password"
            />
          </div>

          <div>
            <Label htmlFor="confirm-password" className="text-slate-600">
              Confirm Password:
            </Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 border-slate-300"
              placeholder="Confirm password"
            />
          </div>
        </div>

        {password && confirmPassword && password !== confirmPassword && (
          <p className="text-red-500 text-sm">Passwords do not match!</p>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleCreate}
            disabled={!username || !password || password !== confirmPassword}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Create Account
          </Button>
          <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}
