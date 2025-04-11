"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { analyzeGeneData } from "@/lib/gene-analysis"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function GeneUpload({ onAnalysisComplete, setGeneData }) {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState("")
  const [diseaseProbabilities, setDiseaseProbabilities] = useState({
    DiseaseA: 0,
    DiseaseB: 0,
    DiseaseC: 0,
  })

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.name.endsWith(".pdf")) {
        setFile(selectedFile)
        setFileName(selectedFile.name)
        setError("")
      } else {
        setError("Please upload a .pdf file from 23andMe or AncestryDNA")
        setFile(null)
        setFileName("")
      }
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a gene file first")
      return
    }

    setIsAnalyzing(true)
    setError("")

    try {
      // Simulate processing (replace with actual PDF processing later)
      setTimeout(() => {
        const results = analyzeGeneData(file)
        setGeneData(file)
        onAnalysisComplete(results)

        // Example dummy probability results
        setDiseaseProbabilities({
          DiseaseA: 62,
          DiseaseB: 34,
          DiseaseC: 78,
        })

        setIsAnalyzing(false)
      }, 2000)
    } catch (err) {
      setError("Error analyzing gene data. Please try again.")
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Genetic Data</CardTitle>
          <CardDescription>
            Upload your 23andMe or AncestryDNA raw data file (.pdf format)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById("file-upload").click()}
            >
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-1">
                {fileName || "Click to upload or drag and drop"}
              </h3>
              <p className="text-sm text-gray-500">
                Supports .pdf files from 23andMe or AncestryDNA
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {file && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    File Uploaded
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-3 rounded-md text-sm">
                    PDF File: <strong>{fileName}</strong>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Genetic Data"}
          </Button>
        </CardFooter>
      </Card>

      {file && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Process</CardTitle>
            <CardDescription>
              Your genetic data will be analyzed for nutrigenomic markers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>File uploaded successfully</span>
              </div>
              <div className="flex items-center">
                {isAnalyzing ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full mr-2"></div>
                    <span>Analyzing genetic markers...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Ready for analysis</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disease Probability Display */}
      <Card>
        <CardHeader>
          <CardTitle>Disease Risk Probabilities</CardTitle>
          <CardDescription>
            Default values are 0% and will update after analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {Object.entries(diseaseProbabilities).map(([disease, value]) => (
              <div key={disease}>
                <svg className="w-24 h-24 mx-auto">
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="42"
                    stroke="#10b981"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={264}
                    strokeDashoffset={264 - (264 * value) / 100}
                    strokeLinecap="round"
                    transform="rotate(-90 48 48)"
                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                  />
                  <text
                    x="48"
                    y="52"
                    textAnchor="middle"
                    fontSize="16"
                    fill="#111827"
                    fontWeight="bold"
                  >
                    {value}%
                  </text>
                </svg>
                <p className="mt-2 font-medium">{disease}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
