"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Zap, Play, Pause, RotateCcw, Check, Settings, Brain, Target } from 'lucide-react'

interface CategorySelectionToolsProps {
  category: string
  config: {
    name: string
    aiFeatures: string[]
  }
}

export function CategorySelectionTools({ category, config }: CategorySelectionToolsProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [qualityThreshold, setQualityThreshold] = useState([80])
  const [autoDelete, setAutoDelete] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  // Category-specific settings
  const [categorySettings, setCategorySettings] = useState({
    portraits: { faceDetection: true, eyeContact: true, expression: true },
    landscapes: { horizonLevel: true, colorBalance: true, composition: true },
    animals: { eyeSharpness: true, naturalPose: true, motionBlur: false },
    // Add more category-specific settings as needed
  })

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setAnalysisComplete(false)

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setAnalysisComplete(true)
          return 100
        }
        return prev + 3
      })
    }, 100)
  }

  const resetAnalysis = () => {
    setAnalysisProgress(0)
    setAnalysisComplete(false)
  }

  const getCategorySpecificSettings = () => {
    const settingsMap = {
      portraits: [
        { key: "faceDetection", label: "Face Detection", description: "Detect and analyze facial features" },
        { key: "eyeContact", label: "Eye Contact Analysis", description: "Prioritize photos with good eye contact" },
        { key: "expression", label: "Expression Quality", description: "Analyze facial expressions and emotions" },
      ],
      landscapes: [
        { key: "horizonLevel", label: "Horizon Level Check", description: "Ensure horizon lines are straight" },
        { key: "colorBalance", label: "Color Balance", description: "Analyze color saturation and balance" },
        { key: "composition", label: "Composition Rules", description: "Apply rule of thirds and other composition guidelines" },
      ],
      animals: [
        { key: "eyeSharpness", label: "Eye Sharpness", description: "Prioritize sharp focus on animal eyes" },
        { key: "naturalPose", label: "Natural Pose", description: "Detect natural and engaging animal poses" },
        { key: "motionBlur", label: "Motion Blur Detection", description: "Identify and filter out motion blur" },
      ],
      // Add more categories as needed
    }

    return settingsMap[category as keyof typeof settingsMap] || []
  }

  const categorySpecificSettings = getCategorySpecificSettings()

  return (
    <div className="space-y-6">
      {/* Analysis Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Configure basic analysis parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Quality Threshold: {qualityThreshold[0]}%</Label>
              <Slider
                value={qualityThreshold}
                onValueChange={setQualityThreshold}
                max={100}
                min={50}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Only photos above this quality score will be selected
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-delete">Auto-delete rejected photos</Label>
              <Switch id="auto-delete" checked={autoDelete} onCheckedChange={setAutoDelete} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              {config.name} AI Features
            </CardTitle>
            <CardDescription>Category-specific analysis options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {categorySpecificSettings.map((setting) => (
              <div key={setting.key} className="flex items-center justify-between">
                <div>
                  <Label htmlFor={setting.key}>{setting.label}</Label>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                <Switch
                  id={setting.key}
                  checked={categorySettings[category as keyof typeof categorySettings]?.[setting.key as keyof typeof categorySettings.portraits] ?? true}
                  onCheckedChange={(checked) => {
                    setCategorySettings(prev => ({
                      ...prev,
                      [category]: {
                        ...prev[category as keyof typeof prev],
                        [setting.key]: checked
                      }
                    }))
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Analysis for {config.name}
          </CardTitle>
          <CardDescription>
            Start intelligent analysis using category-specific AI features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isAnalyzing && !analysisComplete && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {config.aiFeatures.map((feature, index) => (
                  <Badge key={index} variant="outline" className="justify-center">
                    <Target className="h-3 w-3 mr-1" />
                    {feature}
                  </Badge>
                ))}
              </div>
              <Button onClick={startAnalysis} className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Start {config.name} Analysis
              </Button>
            </div>
          )}

          {isAnalyzing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Analyzing {config.name.toLowerCase()}...</span>
                  <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} />
                <p className="text-xs text-muted-foreground">
                  Applying {config.aiFeatures.length} AI features for optimal {config.name.toLowerCase()} selection
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsAnalyzing(false)}>
                <Pause className="mr-2 h-4 w-4" />
                Pause Analysis
              </Button>
            </div>
          )}

          {analysisComplete && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="h-5 w-5" />
                <span className="font-medium">Analysis Complete!</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-xs text-green-700 dark:text-green-300">Best Photos</p>
                </div>
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">24</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">Total Analyzed</p>
                </div>
                <div className="text-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <p className="text-2xl font-bold text-orange-600">67%</p>
                  <p className="text-xs text-orange-700 dark:text-orange-300">Storage Saved</p>
                </div>
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">92</p>
                  <p className="text-xs text-purple-700 dark:text-purple-300">Avg Quality</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Check className="mr-2 h-4 w-4" />
                  Apply Selection
                </Button>
                <Button variant="outline" onClick={resetAnalysis}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
