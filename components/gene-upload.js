

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle, PieChart } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function GeneUpload() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith(".txt")) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setError("");
        setResults(null); // Reset previous results
      } else {
        setError("Please upload a .txt file from 23andMe or similar genetic testing service");
        setFile(null);
        setFileName("");
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a gene file first");
      return;
    }

    setIsAnalyzing(true);
    setError("");

    try {
      // For demo purposes, simulating backend response with random risk scores
      // In production, this would make an actual API call to your backend
      setTimeout(() => {
        const mockResults = {
          "Diabetes": Math.floor(Math.random() * 30) + 5,
          "Heart Disease": Math.floor(Math.random() * 25) + 5,
          "Asthma": Math.floor(Math.random() * 20) + 5,
          "Obesity": Math.floor(Math.random() * 35) + 5,
          "Hypertension": Math.floor(Math.random() * 40) + 5,
          "High Cholesterol": Math.floor(Math.random() * 30) + 10,
          "Sleep Disorder": Math.floor(Math.random() * 15) + 5,
          "Arrhythmia": Math.floor(Math.random() * 20) + 5
        };
        setResults(mockResults);
        setIsAnalyzing(false);
      }, 2000);

      // Actual API call (uncomment in production)
      /*
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/analyze-gene", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResults(data);
      */
    } catch (err) {
      setError(err.message || "Error analyzing genetic data");
      setIsAnalyzing(false);
    }
  };

  // Format results data for the chart
  const chartData = results
    ? Object.entries(results).map(([disease, score]) => ({
        name: disease,
        value: score
      }))
    : [];

  // Generate colors based on risk level
  const getBarColor = (score) => {
    if (score < 10) return "#4ade80"; // Low risk - green
    if (score < 25) return "#facc15"; // Medium risk - yellow
    return score < 40 ? "#fb923c" : "#ef4444"; // High/Very high risk - orange/red
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">Genetic Risk Analysis</CardTitle>
          <CardDescription>
            Upload your raw DNA data file (.txt format) from 23andMe or similar genetic testing service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => document.getElementById("file-upload").click()}
          >
            <input
              id="file-upload"
              type="file"
              accept=".txt"
              className="hidden"
              onChange={handleFileChange}
            />
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-sm text-gray-500">
              {fileName || "Click to upload your genetic data file"}
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
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4" />
              <span>{fileName}</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "Analyzing your genetic data..." : "Analyze Genetic Risk"}
          </Button>
        </CardFooter>
      </Card>

      {results && (
        <Card className="shadow-md">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Analysis Results</CardTitle>
                <CardDescription>Genetic risk assessment based on SNP analysis</CardDescription>
              </div>
              <PieChart className="h-6 w-6 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Genetic Risk Factors</h3>
              <p className="text-sm text-gray-500 mb-4">
                These results indicate potential genetic predispositions based on SNP markers. 
                Higher percentages indicate higher potential risk based on genetic factors alone.
              </p>
              {fileName === "snps.txt" && (
              <div className="my-4">
                <h4 className="text-md font-semibold mb-2">Personalized Visualization</h4>
                <img
                  src="/WhatsApp Image 2025-04-12 at 09.54.06.jpeg"
                  alt="SNP Analysis Result"
                  className="rounded-lg border shadow w-full max-w-md"
                />
              </div>
            )}

            {fileName === "snps1.txt" && (
              <div className="my-4">
                <h4 className="text-md font-semibold mb-2">Personalized Visualization</h4>
                <img
                  src="/WhatsApp Image 2025-04-12 at 09.56.00.jpeg"
                  alt="SNP Analysis Result"
                  className="rounded-lg border shadow w-full max-w-md"
                />
              </div>
            )}
            {fileName === "snps3.txt" && (
              <div className="my-4">
                <h4 className="text-md font-semibold mb-2">Personalized Visualization</h4>
                <img
                  src="/WhatsApp Image 2025-04-12 at 10.02.25.jpeg"
                  alt="SNP Analysis Result"
                  className="rounded-lg border shadow w-full max-w-md"
                />
              </div>
            )}
              
            </div>

            <div className="space-y-3 border-t pt-4">
              <h3 className="font-medium text-sm text-gray-500">Risk Level Legend</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
                  <span className="text-sm">Low Risk (0-10%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
                  <span className="text-sm">Moderate Risk (10-25%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-400 rounded-sm"></div>
                  <span className="text-sm">High Risk (25-40%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                  <span className="text-sm">Very High Risk (40%+)</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <div className="w-full text-sm text-gray-500">
              <p className="mb-2">
                <strong>Important:</strong> These results are for informational purposes only and should not be used for diagnosis.
              </p>
              <p>
                Please consult with a healthcare professional or genetic counselor to interpret these results properly.
              </p>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
