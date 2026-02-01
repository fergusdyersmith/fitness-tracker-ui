"use client"

import { useState } from "react"
import LoginScreen from "@/components/fitness/login-screen"
import CreateAccountScreen from "@/components/fitness/create-account-screen"
import MainDashboard from "@/components/fitness/main-dashboard"
import MenuScreen from "@/components/fitness/menu-screen"
import SettingsScreen from "@/components/fitness/settings-screen"
import DataScreen from "@/components/fitness/data-screen"
import AnalysisScreen from "@/components/fitness/analysis-screen"
import GoalsScreen from "@/components/fitness/goals-screen"
import WorkoutsScreen from "@/components/fitness/workouts-screen"
import ErrorScreen from "@/components/fitness/error-screen"

export type Screen =
  | "login"
  | "create-account"
  | "dashboard"
  | "menu"
  | "settings"
  | "data"
  | "analysis"
  | "goals"
  | "workouts"
  | "error"

export type User = {
  username: string
  password: string
  gender: string
  height: string
  startWeight: string
  joinDate: string
}

export default function FitnessTracker() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login")
  const [user, setUser] = useState<User | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const showError = (message: string) => {
    setErrorMessage(message)
    setCurrentScreen("error")
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return (
          <LoginScreen
            onLogin={(u) => {
              setUser(u)
              setCurrentScreen("dashboard")
            }}
            onCreateAccount={() => setCurrentScreen("create-account")}
          />
        )
      case "create-account":
        return (
          <CreateAccountScreen
            onAccountCreated={(u) => {
              setUser(u)
              setCurrentScreen("login")
            }}
            onBack={() => setCurrentScreen("login")}
          />
        )
      case "dashboard":
        return (
          <MainDashboard
            user={user}
            onOpenMenu={() => setCurrentScreen("menu")}
            onError={showError}
          />
        )
      case "menu":
        return (
          <MenuScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onClose={() => setCurrentScreen("dashboard")}
          />
        )
      case "settings":
        return (
          <SettingsScreen
            user={user}
            onUpdateUser={setUser}
            onBack={() => setCurrentScreen("menu")}
          />
        )
      case "data":
        return (
          <DataScreen
            onBack={() => setCurrentScreen("menu")}
            onError={showError}
          />
        )
      case "analysis":
        return <AnalysisScreen onBack={() => setCurrentScreen("menu")} />
      case "goals":
        return (
          <GoalsScreen
            onBack={() => setCurrentScreen("menu")}
            onError={showError}
          />
        )
      case "workouts":
        return (
          <WorkoutsScreen
            onBack={() => setCurrentScreen("menu")}
            onError={showError}
          />
        )
      case "error":
        return (
          <ErrorScreen
            message={errorMessage}
            onRetry={() => setCurrentScreen("dashboard")}
            onAddWorkout={() => setCurrentScreen("workouts")}
            onMainMenu={() => setCurrentScreen("menu")}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">{renderScreen()}</div>
    </main>
  )
}
