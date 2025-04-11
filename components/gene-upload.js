"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { analyzeGeneData } from "@/lib/gene-analysis"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function GeneUpload({ onAnalysisComplete, setGeneData }) {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState("")
  const [fileContent, setFileContent] = useState("")

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile.name.endsWith(".txt")) {
        setFile(selectedFile)
        setFileName(selectedFile.name)
        setError("")

        // Read file content
        const reader = new FileReader()
        reader.onload = (event) => {
          setFileContent(event.target.result)
        }
        reader.readAsText(selectedFile)
      } else {
        setError("Please upload a .txt file from 23andMe or AncestryDNA")
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
      // In a real app, this would be an API call to a backend service
      // For demo purposes, we're using a mock analysis function
      setTimeout(() => {
        const results = analyzeGeneData(fileContent)
        setGeneData(fileContent)
        onAnalysisComplete(results)
        setIsAnalyzing(false)
      }, 2000) // Simulate processing time
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
          <CardDescription>Upload your 23andMe or AncestryDNA raw data file (.txt format)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById("file-upload").click()}
            >
              <input id="file-upload" type="file" accept=".txt" className="hidden" onChange={handleFileChange} />
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-1">{fileName || "Click to upload or drag and drop"}</h3>
              <p className="text-sm text-gray-500">Supports .txt files from 23andMe or AncestryDNA</p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {fileContent && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    File Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <pre className="text-xs overflow-auto max-h-40">{fileContent.slice(0, 500)}...</pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAnalyze} disabled={!file || isAnalyzing} className="w-full">
            {isAnalyzing ? "Analyzing..." : "Analyze Genetic Data"}
          </Button>
        </CardFooter>
      </Card>

      {fileContent && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Process</CardTitle>
            <CardDescription>Your genetic data will be analyzed for nutrigenomic markers</CardDescription>
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
                ) : fileContent ? (
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Ready for analysis</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-400">Waiting for file</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
