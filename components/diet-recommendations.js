"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Printer, Share2 } from "lucide-react"

export default function DietRecommendations({ analysisResults }) {
  const [activePlan, setActivePlan] = useState("balanced")

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
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Your Personalized Diet Recommendations</CardTitle>
              <CardDescription>Based on your genetic profile analysis</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Genetic Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults.strengths.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Badge variant="outline" className="bg-green-100 text-green-800 mr-2">
                          +
                        </Badge>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-amber-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Sensitivities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults.sensitivities.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 mr-2">
                          !
                        </Badge>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-red-50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Avoid or Limit</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults.avoid.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Badge variant="outline" className="bg-red-100 text-red-800 mr-2">
                          -
                        </Badge>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Diet Plans</CardTitle>
                <CardDescription>Choose a diet plan that fits your lifestyle and genetic profile</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activePlan} onValueChange={setActivePlan}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="balanced">Balanced</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="longevity">Longevity</TabsTrigger>
                  </TabsList>

                  <TabsContent value="balanced" className="space-y-4">
                    <h3 className="text-lg font-medium">Balanced Diet Plan</h3>
                    <p>
                      This plan is designed to provide optimal nutrition based on your genetic profile while maintaining
                      a balanced approach to all food groups.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Recommended Foods</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1">
                            {analysisResults.recommendedFoods.slice(0, 6).map((food, index) => (
                              <li key={index}>{food}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Meal Plan Example</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium">Breakfast</h4>
                              <p className="text-sm text-gray-600">Greek yogurt with berries and nuts</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Lunch</h4>
                              <p className="text-sm text-gray-600">Grilled salmon with quinoa and vegetables</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Dinner</h4>
                              <p className="text-sm text-gray-600">Lean protein with sweet potatoes and leafy greens</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="performance" className="space-y-4">
                    <h3 className="text-lg font-medium">Performance Diet Plan</h3>
                    <p>This plan is optimized for athletic performance and recovery based on your genetic markers.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Recommended Foods</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>High-quality protein sources</li>
                            <li>Complex carbohydrates</li>
                            <li>Anti-inflammatory foods</li>
                            <li>Nutrient-dense vegetables</li>
                            <li>Recovery-promoting berries</li>
                            <li>Hydration-supporting electrolytes</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Meal Plan Example</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium">Pre-Workout</h4>
                              <p className="text-sm text-gray-600">Banana with almond butter</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Post-Workout</h4>
                              <p className="text-sm text-gray-600">Protein shake with berries and spinach</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Dinner</h4>
                              <p className="text-sm text-gray-600">Lean protein, sweet potatoes, and broccoli</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="longevity" className="space-y-4">
                    <h3 className="text-lg font-medium">Longevity Diet Plan</h3>
                    <p>
                      This plan focuses on foods that support cellular health, reduce inflammation, and promote
                      longevity based on your genetic profile.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Recommended Foods</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Antioxidant-rich berries</li>
                            <li>Omega-3 fatty fish</li>
                            <li>Cruciferous vegetables</li>
                            <li>Polyphenol-rich olive oil</li>
                            <li>Fermented foods</li>
                            <li>Green tea</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">Meal Plan Example</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium">Breakfast</h4>
                              <p className="text-sm text-gray-600">Green tea with overnight oats and berries</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Lunch</h4>
                              <p className="text-sm text-gray-600">Mediterranean salad with olive oil and sardines</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Dinner</h4>
                              <p className="text-sm text-gray-600">Vegetable stir-fry with turmeric and ginger</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supplement Recommendations</CardTitle>
                <CardDescription>Based on your genetic profile, these supplements may be beneficial</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {analysisResults.supplements.map((supplement, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">{supplement.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{supplement.reason}</p>
                        <Badge className="mt-2" variant="outline">
                          {supplement.dosage}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
