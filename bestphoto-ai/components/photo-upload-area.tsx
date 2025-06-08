"use client"

import { useState, useCallback, JSX } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Check, AlertCircle, Wand2, Scissors, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  file: File
  preview: string
  status: "uploading" | "completed" | "error"
  progress: number
}

interface PhotoUploadAreaProps {
  onUploadComplete?: (photo?: { id: string; file: File; preview: string; name: string }) => void
  mode: "upscale" | "remove-background"
  onProcess: () => void
  isProcessing: boolean
}

export function PhotoUploadArea({ onUploadComplete, mode, onProcess, isProcessing }: PhotoUploadAreaProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Only handle the first file since multiple is false
      const file = acceptedFiles[0];
      if (!file) return;

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        status: "uploading",
        progress: 0,
      };

      setUploadedFiles([newFile]); // Set only the new file, replacing previous ones
      setIsUploading(true);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) => {
            if (f.id === newFile.id) {
              const newProgress = Math.min(f.progress + 10, 100);
              const newStatus = newProgress === 100 ? "completed" : "uploading";
              return {
                ...f,
                progress: newProgress,
                status: newStatus,
              };
            }
            return f;
          })
        );
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setIsUploading(false);

        // Call onUploadComplete with the completed file (File object)
        if (onUploadComplete) {
          onUploadComplete({
            id: newFile.id,
            file: newFile.file,
            preview: newFile.preview,
            name: newFile.file.name,
          });
        }
      }, 2000);
    },
    [onUploadComplete],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
    },
    multiple: false,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined
  })

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id))

    // Call onUploadComplete with undefined if no files remain
    if (onUploadComplete && uploadedFiles.length === 1 && uploadedFiles[0].id === id) {
      onUploadComplete(undefined)
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950" : "border-gray-300 hover:border-gray-400",
        )}
      >
        <input {...(getInputProps() as JSX.IntrinsicElements["input"])} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          {isDragActive ? "Drop your photos here" : "Upload your photos"}
        </p>
        <p className="text-sm text-gray-500 mb-4">Drag and drop your photos here, or click to browse</p>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Choose Files
        </Button>
        <p className="text-xs text-gray-400 mt-2">Supports: JPG, PNG, GIF, BMP, WEBP (Max 10MB each)</p>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mt-4">
            <h3 className="text-lg font-medium">Uploaded Files ({uploadedFiles.length})</h3>
            <Button onClick={onProcess} disabled={isProcessing || isUploading || uploadedFiles.some(f => f.status !== "completed")}>
              {isProcessing ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : mode === "upscale" ? (
                <Wand2 className="mr-2 h-4 w-4" />
              ) : (
                <Scissors className="mr-2 h-4 w-4" />
              )}
              {isProcessing
                ? "Processing..."
                : mode === "upscale"
                ? "Upscale Photo"
                : "Remove Background"}
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={file.preview || "/placeholder.svg"}
                    alt={file.file.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="destructive" onClick={() => removeFile(file.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{file.file.name}</p>
                    <Badge
                      variant={
                        file.status === "completed" ? "default" : file.status === "error" ? "destructive" : "secondary"
                      }
                    >
                      {file.status === "completed" && <Check className="h-3 w-3 mr-1" />}
                      {file.status === "error" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {file.status === "uploading" && <Upload className="h-3 w-3 mr-1" />}
                      {file.status}
                    </Badge>
                  </div>
                  {file.status === "uploading" && <Progress value={file.progress} className="h-1" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
