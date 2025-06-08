"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, Download, Trash2, Star, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CategoryPhotoGridProps {
  category: string
  viewMode: "grid" | "list"
}


const generateSamplePhotos = (category: string) => {
  const basePhotos = [
    {
      id: "1",
      name: "IMG_001.jpg",
      selected: false,
      aiSelected: true,
      size: "2.4 MB",
      date: "2024-01-15",
    },
    {
      id: "2",
      name: "IMG_002.jpg",
      selected: false,
      aiSelected: false,
      size: "1.8 MB",
      date: "2024-01-15",
    },
    {
      id: "3",
      name: "IMG_003.jpg",
      selected: false,
      aiSelected: true,
      size: "3.1 MB",
      date: "2024-01-14",
    },
    {
      id: "4",
      name: "IMG_004.jpg",
      selected: false,
      aiSelected: false,
      size: "2.0 MB",
      date: "2024-01-14",
    },
    {
      id: "5",
      name: "IMG_005.jpg",
      selected: false,
      aiSelected: true,
      size: "2.7 MB",
      date: "2024-01-13",
    },
    {
      id: "6",
      name: "IMG_006.jpg",
      selected: false,
      aiSelected: false,
      size: "1.9 MB",
      date: "2024-01-13",
    },
    {
      id: "7",
      name: "IMG_007.jpg",
      selected: false,
      aiSelected: true,
      size: "2.5 MB",
      date: "2024-01-12",
    },
    {
      id: "8",
      name: "IMG_008.jpg",
      selected: false,
      aiSelected: false,
      size: "2.2 MB",
      date: "2024-01-12",
    },
  ]

  return basePhotos.map((photo) => ({
    ...photo,
    preview: `/placeholder.svg?height=300&width=300&text=${category}-${photo.id}`,
  }))
}

export function CategoryPhotoGrid({ category, viewMode }: CategoryPhotoGridProps) {
  const [photos, setPhotos] = useState(generateSamplePhotos(category))
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])

  const togglePhotoSelection = (photoId: string) => {
    setSelectedPhotos((prev) => (prev.includes(photoId) ? prev.filter((id) => id !== photoId) : [...prev, photoId]))
  }

  const selectAllAIRecommended = () => {
    const aiSelectedIds = photos.filter((photo) => photo.aiSelected).map((photo) => photo.id)
    setSelectedPhotos(aiSelectedIds)
  }

  const clearSelection = () => {
    setSelectedPhotos([])
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Eye className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No photos yet</h3>
        <p className="text-gray-500 mb-4">Upload some photos to get started with AI selection</p>
        <Button>Upload Photos</Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Selection controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {photos.length} photos • {selectedPhotos.length} selected
          </p>
          {photos.some((photo) => photo.aiSelected) && (
            <Button variant="outline" size="sm" onClick={selectAllAIRecommended}>
              <Star className="mr-2 h-4 w-4" />
              Select AI Recommended ({photos.filter((p) => p.aiSelected).length})
            </Button>
          )}
          {selectedPhotos.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearSelection}>
              Clear Selection
            </Button>
          )}
        </div>

        {selectedPhotos.length > 0 && (
          <div className="flex items-center gap-2">
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download ({selectedPhotos.length})
            </Button>
            <Button size="sm" variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ({selectedPhotos.length})
            </Button>
          </div>
        )}
      </div>

      {/* Photo grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-transparent hover:border-cyan-500 transition-colors">
                <img
                  src={photo.preview || "/placeholder.svg"}
                  alt={photo.name}
                  className="w-full h-full object-cover"
                />

                {/* Overlay controls */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-1">
                    <Button size="sm" variant="secondary">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Download className="h-3 w-3" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="secondary">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Selection checkbox */}
                <div className="absolute top-2 left-2">
                  <Checkbox
                    checked={selectedPhotos.includes(photo.id)}
                    onCheckedChange={() => togglePhotoSelection(photo.id)}
                    className="bg-white/80 border-white"
                  />
                </div>

                {/* AI recommendation badge */}
                {photo.aiSelected && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-cyan-600 text-white text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      AI Pick
                    </Badge>
                  </div>
                )}

                
              </div>

              {/* Photo info */}
              <div className="mt-2">
                <p className="text-xs font-medium truncate">{photo.name}</p>
                <p className="text-xs text-muted-foreground">{photo.size}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List view */
        <div className="space-y-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Checkbox
                checked={selectedPhotos.includes(photo.id)}
                onCheckedChange={() => togglePhotoSelection(photo.id)}
              />
              <div className="w-12 h-12 rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={photo.preview || "/placeholder.svg"}
                  alt={photo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{photo.name}</p>
                  {photo.aiSelected && (
                    <Badge className="bg-cyan-600 text-white text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      AI Pick
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {photo.size} • {photo.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
