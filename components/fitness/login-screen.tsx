"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/app/page"

type Props = {
  onLogin: (user: User) => void
  onCreateAccount: () => void
}

export default function LoginScreen({ onLogin, onCreateAccount }: Props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    if (username && password) {
      onLogin({
        username,
        password,
        gender: "Male",
        height: "175 cm",
        startWeight: "70 kg",
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
          Login
        </h2>

        <div className="space-y-3">
          <div>
            <Label htmlFor="username" className="text-slate-600">
              Username:
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 border-slate-300"
              placeholder="Enter username"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-slate-600">
              Password:
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 border-slate-300"
              placeholder="Enter password"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleLogin}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            Login
          </Button>
          <Button
            onClick={onCreateAccount}
            variant="outline"
            className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}
