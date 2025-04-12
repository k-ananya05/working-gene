"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, Heart, TrendingUp, Watch } from "lucide-react"

// Updated mockFitnessData with calories between 100 and 500
const mockFitnessData = () => ({
  heartRate: Math.floor(Math.random() * 50) + 70, // 70 - 120 bpm
  bloodPressure: {
    systolic: Math.floor(Math.random() * 50) + 100, // 100 - 150
    diastolic: Math.floor(Math.random() * 30) + 60, // 60 - 90
  },
  bloodGlucose: Math.floor(Math.random() * 80) + 70, // 70 - 150
  steps: Math.floor(Math.random() * 7000) + 1000, // 1000 - 8000
  calories: Math.floor(Math.random() * 401) + 100, // Random calories between 100 - 500
  weight: Math.floor(Math.random() * 50) + 60, // 60 - 110
  activity: `${Math.floor(Math.random() * 60)} mins`,
})


export default function FitnessTracking({ analysisResults }) {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fitnessData, setFitnessData] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [activeTab, setActiveTab] = useState("overview")
  const [gmail, setGmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedDay, setSelectedDay] = useState(1)
  const [dailyLogs, setDailyLogs] = useState({
    1: mockFitnessData(),
    2: mockFitnessData(),
    3: mockFitnessData(),
  })

  useEffect(() => {
    if (connected) {
      const interval = setInterval(() => {
        const newData = mockFitnessData()
        setFitnessData(newData)

        const newAlerts = []

        if (analysisResults && newData) {
          if (newData.heartRate > 100) {
            newAlerts.push({
              title: "Elevated Heart Rate",
              description: "Your heart rate is higher than optimal.",
              time: new Date().toLocaleTimeString(),
            })
          }
          if (newData.bloodPressure.systolic > 140 || newData.bloodPressure.diastolic > 90) {
            newAlerts.push({
              title: "High Blood Pressure",
              description: "Blood pressure is elevated. Consider rest.",
              time: new Date().toLocaleTimeString(),
            })
          }
          if (newData.bloodGlucose > 140) {
            newAlerts.push({
              title: "High Blood Glucose",
              description: "Your blood sugar is high. Monitor diet and rest.",
              time: new Date().toLocaleTimeString(),
            })
          }
        }

        setAlerts((prev) => [...newAlerts, ...prev].slice(0, 5))
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [connected, analysisResults])

  const handleConnect = () => {
    setLoading(true)
    setTimeout(() => {
      setConnected(true)
      setLoading(false)
      setFitnessData(mockFitnessData())
    }, 2000)
  }

  const handleSignIn = () => {
    if (gmail === "user@gmail.com" && password === "password123") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials")
    }
  }

  const handleDayClick = (day) => setSelectedDay(day)

  const currentData = dailyLogs[selectedDay]

  const detectConditions = (data) => {
    const { heartRate, calories, steps, weight } = data
    const conditions = []

    if (calories < 150 || weight > 90) conditions.push("diabetes")
    if (heartRate > 100 || steps < 3000) conditions.push("heart_disease")
    if (heartRate > 110) conditions.push("asthma")
    if (weight > 100) conditions.push("obesity")
    if (heartRate > 105 || weight > 95) conditions.push("hypertension")
    if (calories < 180) conditions.push("high_cholesterol")
    if (calories < 150 || steps < 3000) conditions.push("sleep_disorder")
    if (heartRate > 120) conditions.push("arrhythmia")

    return conditions
  }

  const conditionResults = detectConditions(currentData || {})

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center p-12">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Gmail ID"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <Button onClick={handleSignIn}>Sign In</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fitness Tracking & Real-time Alerts</CardTitle>
          <CardDescription>Connect your fitness device to receive personalized health insights</CardDescription>
        </CardHeader>
        <CardContent>
          {!connected ? (
            <div className="text-center py-8">
              <Watch className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Connect Your Fitness Device</h3>
              <p className="text-sm text-gray-500 mb-6">Sync with Fitbit, Apple Watch, or other smart devices</p>
              <Button onClick={handleConnect} disabled={loading}>
                {loading ? "Connecting..." : "Connect Device"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Connected
                  </Badge>
                  <span className="ml-2 text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => setConnected(false)}>
                  Disconnect
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-red-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center">
                          <Heart className="h-4 w-4 mr-2 text-red-500" />
                          Heart Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-red-600">
                          {currentData?.heartRate} <span className="text-sm font-normal">bpm</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-blue-500" />
                          Daily Steps
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600">
                          {currentData?.steps?.toLocaleString()}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
                          Calories
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-purple-600">
                          {currentData?.calories} <span className="text-sm font-normal">kcal</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex justify-center space-x-4">
                    {[1, 2, 3].map((day) => (
                      <Button
                        key={day}
                        variant={selectedDay === day ? "default" : "outline"}
                        onClick={() => handleDayClick(day)}
                      >
                        Day {day}
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="alerts" className="space-y-4">
                  {alerts.length > 0 ? (
                    alerts.map((alert, idx) => (
                      <Card key={idx} className="border-l-4 border-red-500 bg-red-50 p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-bold text-red-800">{alert.title}</p>
                            <p className="text-sm text-red-700">{alert.description}</p>
                          </div>
                          <div className="text-xs text-gray-500">{alert.time}</div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm">No recent alerts detected.</div>
                  )}
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  {currentData ? (
                    <div className="space-y-2">
                      {conditionResults.map((condition, index) => (
                        <Card key={index} className="p-4 bg-yellow-50 border-l-4 border-yellow-400">
                          <p className="text-md font-semibold text-yellow-800">
                            Condition: {condition}
                          </p>
                          <p className="text-sm text-gray-700">
                            📊 Prediction: <span className="text-red-600 font-bold">🔴 RISK</span>
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            Heart Rate: {currentData.heartRate} | Calories: {currentData.calories} | Steps:{" "}
                            {currentData.steps} | Weight: {currentData.weight} | Activity: {currentData.activity}
                          </p>
                        </Card>
                      ))}
                      {conditionResults.length === 0 && (
                        <p className="text-gray-500 text-sm">No conditions detected today.</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">No data available for recommendations.</div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
