"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Zap, Eye, Download, Trash2, Settings, Play, Pause, RotateCcw, Check, Star, Filter } from "lucide-react"

interface PhotoSelectionToolsProps {
  category: string
}

export function PhotoSelectionTools({ category }: PhotoSelectionToolsProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [qualityThreshold, setQualityThreshold] = useState([80])
  const [autoDelete, setAutoDelete] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const samplePhotos = [
    { id: "1", name: "IMG_001.jpg", quality: 95, selected: true, preview: "/placeholder.svg?height=150&width=150" },
    { id: "2", name: "IMG_002.jpg", quality: 78, selected: false, preview: "/placeholder.svg?height=150&width=150" },
    { id: "3", name: "IMG_003.jpg", quality: 89, selected: true, preview: "/placeholder.svg?height=150&width=150" },
    { id: "4", name: "IMG_004.jpg", quality: 65, selected: false, preview: "/placeholder.svg?height=150&width=150" },
    { id: "5", name: "IMG_005.jpg", quality: 92, selected: true, preview: "/placeholder.svg?height=150&width=150" },
    { id: "6", name: "IMG_006.jpg", quality: 71, selected: false, preview: "/placeholder.svg?height=150&width=150" },
  ]

  return (
    <div className="space-y-6">
      {/* Analysis Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Analysis Settings
            </CardTitle>
            <CardDescription>Configure how the AI selects your best photos</CardDescription>
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
              <p className="text-xs text-muted-foreground">Only photos above this quality score will be selected</p>
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
              <Zap className="h-5 w-5" />
              AI Analysis
            </CardTitle>
            <CardDescription>Start AI-powered photo selection for {category}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isAnalyzing && analysisProgress === 0 && (
              <Button onClick={startAnalysis} className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Start Analysis
              </Button>
            )}

            {isAnalyzing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Analyzing photos...</span>
                  <span className="text-sm text-muted-foreground">{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} />
                <Button variant="outline" size="sm" onClick={() => setIsAnalyzing(false)}>
                  <Pause className="mr-2 h-4 w-4" />
                  Pause
                </Button>
              </div>
            )}

            {!isAnalyzing && analysisProgress === 100 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Analysis Complete!</span>
                </div>
                <p className="text-sm text-muted-foreground">Found 3 best photos out of 6 analyzed</p>
                <Button variant="outline" size="sm" onClick={() => setAnalysisProgress(0)}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Photo Results */}
      {analysisProgress === 100 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Photo Selection Results
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Selected
                </Button>
              </div>
            </CardTitle>
            <CardDescription>Review and adjust the AI's photo selection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {samplePhotos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <div
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      photo.selected ? "border-green-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={photo.preview || "/placeholder.svg"}
                      alt={photo.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1">
                        <Button size="sm" variant="secondary">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    {photo.selected && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge
                        variant={photo.quality >= 85 ? "default" : photo.quality >= 70 ? "secondary" : "destructive"}
                      >
                        <Star className="h-3 w-3 mr-1" />
                        {photo.quality}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs font-medium truncate">{photo.name}</p>
                    <p className="text-xs text-muted-foreground">Quality: {photo.quality}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
