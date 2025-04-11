"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertTriangle, Heart, TrendingUp, Watch } from "lucide-react"
import { mockFitnessData } from "@/lib/mock-fitness-data"

export default function FitnessTracking({ analysisResults }) {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fitnessData, setFitnessData] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (connected) {
      // Simulate receiving data from a fitness tracker
      const interval = setInterval(() => {
        // Get random data from our mock data
        const newData = mockFitnessData()
        setFitnessData(newData)

        // Check for alerts based on genetic profile and current data
        if (analysisResults && newData) {
          const newAlerts = []

          // Heart rate alert
          if (newData.heartRate > 100) {
            newAlerts.push({
              type: "warning",
              title: "Elevated Heart Rate",
              description: "Your heart rate is higher than optimal based on your genetic profile.",
              time: new Date().toLocaleTimeString(),
            })
          }

          // Blood pressure alert
          if (newData.bloodPressure.systolic > 140 || newData.bloodPressure.diastolic > 90) {
            newAlerts.push({
              type: "danger",
              title: "High Blood Pressure",
              description: "Your blood pressure is elevated. Consider rest and hydration.",
              time: new Date().toLocaleTimeString(),
            })
          }

          // Blood glucose alert
          if (newData.bloodGlucose > 140) {
            newAlerts.push({
              type: "danger",
              title: "Elevated Blood Glucose",
              description: "Your blood glucose is higher than recommended for your genetic profile.",
              time: new Date().toLocaleTimeString(),
            })
          }

          if (newAlerts.length > 0) {
            setAlerts((prev) => [...newAlerts, ...prev].slice(0, 5))
          }
        }
      }, 5000) // Update every 5 seconds

      return () => clearInterval(interval)
    }
  }, [connected, analysisResults])

  const handleConnect = () => {
    setLoading(true)
    // Simulate connecting to a fitness device
    setTimeout(() => {
      setConnected(true)
      setLoading(false)
      setFitnessData(mockFitnessData())
    }, 2000)
  }

  if (!analysisResults) {
    return (
      <div className="text-center p-12">
        <p>Please upload and analyze your genetic data first.</p>
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
                          {fitnessData?.heartRate} <span className="text-sm font-normal">bpm</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {fitnessData?.heartRate < 60
                            ? "Resting"
                            : fitnessData?.heartRate < 100
                              ? "Normal"
                              : "Elevated"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center">
                          <Activity className="h-4 w-4 mr-2 text-blue-500" />
                          Blood Pressure
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600">
                          {fitnessData?.bloodPressure.systolic}/{fitnessData?.bloodPressure.diastolic}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {fitnessData?.bloodPressure.systolic < 120 && fitnessData?.bloodPressure.diastolic < 80
                            ? "Normal"
                            : "Elevated"}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center">
                          <TrendingUp className="h-4 w-4 mr-2 text-purple-500" />
                          Blood Glucose
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-purple-600">
                          {fitnessData?.bloodGlucose} <span className="text-sm font-normal">mg/dL</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {fitnessData?.bloodGlucose < 100
                            ? "Normal"
                            : fitnessData?.bloodGlucose < 140
                              ? "Elevated"
                              : "High"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold">{fitnessData?.steps.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">Steps</div>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold">{fitnessData?.calories}</div>
                          <div className="text-sm text-gray-500">Calories</div>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold">{fitnessData?.distance}</div>
                          <div className="text-sm text-gray-500">Distance (km)</div>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold">{fitnessData?.activeMinutes}</div>
                          <div className="text-sm text-gray-500">Active Minutes</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="alerts" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Health Alerts</CardTitle>
                      <CardDescription>
                        Real-time alerts based on your genetic profile and current health data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {alerts.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                          <AlertTriangle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <p>No alerts at this time. Your health metrics look good!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {alerts.map((alert, index) => (
                            <Alert key={index} variant={alert.type === "danger" ? "destructive" : "default"}>
                              <AlertTriangle className="h-4 w-4" />
                              <AlertTitle className="flex items-center justify-between">
                                {alert.title}
                                <span className="text-xs font-normal">{alert.time}</span>
                              </AlertTitle>
                              <AlertDescription>{alert.description}</AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personalized Recommendations</CardTitle>
                      <CardDescription>Based on your genetic profile and current fitness data</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h3 className="font-medium text-green-800 mb-2">Optimal Exercise Types</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            {analysisResults.exerciseRecommendations.map((item, index) => (
                              <li key={index} className="text-gray-700">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h3 className="font-medium text-blue-800 mb-2">Recovery Recommendations</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            <li className="text-gray-700">Optimal sleep duration: 7-8 hours</li>
                            <li className="text-gray-700">Hydration: 3-4 liters of water daily</li>
                            <li className="text-gray-700">
                              Recovery nutrition: Protein within 30 minutes post-exercise
                            </li>
                            <li className="text-gray-700">Stress management: 10 minutes of meditation daily</li>
                          </ul>
                        </div>

                        {fitnessData?.heartRate > 100 && (
                          <div className="p-4 bg-amber-50 rounded-lg">
                            <h3 className="font-medium text-amber-800 mb-2">Current Recommendations</h3>
                            <p className="text-gray-700">
                              Your heart rate is elevated. Consider taking a break and practicing deep breathing
                              exercises.
                            </p>
                          </div>
                        )}

                        {fitnessData?.bloodGlucose > 120 && (
                          <div className="p-4 bg-amber-50 rounded-lg">
                            <h3 className="font-medium text-amber-800 mb-2">Blood Glucose Alert</h3>
                            <p className="text-gray-700">
                              Your blood glucose is higher than optimal. Consider a short walk and drinking water.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
