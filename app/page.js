"use client"

import { useState } from "react"
import GeneUpload from "@/components/gene-upload"
import DietRecommendations from "@/components/diet-recommendations"
import FitnessTracking from "@/components/fitness-tracking"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload")
  const [geneData, setGeneData] = useState(null)
  const [analysisResults, setAnalysisResults] = useState(null)

  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results)
    setActiveTab("recommendations")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">GeneSynth AI</h1>
          <p className="text-gray-600">Personalized Nutrigenomics Platform</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upload">Gene Upload</TabsTrigger>
            <TabsTrigger value="recommendations" disabled={!analysisResults}>
              Diet Recommendations
            </TabsTrigger>
            <TabsTrigger value="tracking" disabled={!analysisResults}>
              Fitness Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-4">
            <GeneUpload onAnalysisComplete={handleAnalysisComplete} setGeneData={setGeneData} />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-4">
            <DietRecommendations analysisResults={analysisResults} />
          </TabsContent>

          <TabsContent value="tracking" className="mt-4">
            <FitnessTracking analysisResults={analysisResults} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
