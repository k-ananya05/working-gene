"use client"

import { useState } from "react"
import GeneUpload from "@/components/gene-upload"
import DietRecommendations from "@/components/diet-recommendations"
import FitnessTracking from "@/components/fitness-tracking"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FlaskConical } from "lucide-react"
import { FlaskConical } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState("upload")
  const [geneData, setGeneData] = useState(null)
  const [analysisResults, setAnalysisResults] = useState(null)

  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results)
    setActiveTab("recommendations")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-cyan-100 p-6 md:p-12">
    <main className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-cyan-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-violet-100 p-3 rounded-full shadow-md">
              <FlaskConical className="h-10 w-10 text-violet-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">GeneSynth AI</h1>
          <p className="text-lg text-gray-600">Personalized Nutrigenomics Platform</p>
        <header className="mb-10 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-violet-100 p-3 rounded-full shadow-md">
              <FlaskConical className="h-10 w-10 text-violet-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">GeneSynth AI</h1>
          <p className="text-lg text-gray-600">Personalized Nutrigenomics Platform</p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-lg shadow mb-8 overflow-hidden">
            <TabsTrigger value="upload" className="data-[state=active]:bg-violet-200 data-[state=active]:font-semibold">
              Gene Upload
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-violet-200 data-[state=active]:font-semibold">
              Diet Recommendations
            </TabsTrigger>
            <TabsTrigger value="tracking" className="data-[state=active]:bg-violet-200 data-[state=active]:font-semibold">
              Fitness Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-4">
            <GeneUpload
              onAnalysisComplete={handleAnalysisComplete}
              setGeneData={setGeneData}
            />
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
