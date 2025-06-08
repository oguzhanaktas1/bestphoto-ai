"use client";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadToCloudinary";
import { useState, useCallback, JSX } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  Check,
  AlertCircle,
  Camera,
  Lightbulb,
  ThumbsUp,
  RefreshCw,
  Trash2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { selectBestPortraitPhoto } from "@/lib/algorithms/portraits";
import { selectBestAnimalPhoto } from "@/lib/algorithms/animals";
import { selectBestLandscapePhoto } from "@/lib/algorithms/landscapes";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAuth } from "firebase/auth";

interface CategoryUploadAreaProps {
  category: string;
  config: {
    name: string;
    description: string;
    tips: string[];
    aiFeatures: string[];
  };
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: "uploading" | "completed" | "error";
  progress: number;
  aiSelected?: boolean;
}

export function CategoryUploadArea({
  category,
  config,
}: CategoryUploadAreaProps) {
  // Main states for file uploads and AI analysis
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [numBestPhotos, setNumBestPhotos] = useState(1);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [bestPhotoName, setBestPhotoName] = useState<string | null>(null);
  const [bestPhotoId, setBestPhotoId] = useState<string | null>(null);

  // States for AI feedback
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [firstAiOutput, setFirstAiOutput] = useState<string | null>(null);
  const [secondAiResult, setSecondAiResult] = useState<any | null>(null);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  // States for "Selected Best Photo" dialog and its features
  const [showCard, setShowCard] = useState(false); // Controls the "Selected Best Photo" dialog
  const [selectedBestPhotoUrl, setSelectedBestPhotoUrl] = useState<string | null>(null);

  // States for Upscale feature (within the "Selected Best Photo" dialog)
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [upscaledUrl, setUpscaledUrl] = useState<string | null>(null);

  // States for Background Remove feature (within the "Selected Best Photo" dialog)
  const [isProcessing, setIsProcessing] = useState(false); // For background remove
  const [bgRemovedUrl, setBgRemovedUrl] = useState<string | null>(null);
  const [showBgRemovedImageInDialog, setShowBgRemovedImageInDialog] = useState(false); // Controls background remove comparison dialog


  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: "uploading",
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setIsUploading(true);
    setAnalysisComplete(false);

    newFiles.forEach(async (uploadFile) => {
      try {
        const interval = setInterval(() => {
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id && f.progress < 100
                ? { ...f, progress: f.progress + 20 }
                : f
            )
          );
        }, 200);

        setTimeout(() => {
          clearInterval(interval);
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? { ...f, progress: 100, status: "completed" }
                : f
            )
          );

          setUploadedFiles((prevFiles) => {
            const allCompleted = prevFiles.every(
              (f) => f.status === "completed"
            );
            if (allCompleted) {
              setIsUploading(false);
            }
            return prevFiles;
          });
        }, 1000);
      } catch (error) {
        console.error("Upload error:", error);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, status: "error", progress: 0 } : f
          )
        );
        setIsUploading(false);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp", ".heic"],
    },
    multiple: true,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined,
  });

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
    setSelectedPhotos((prev) => prev.filter((photoId) => photoId !== id));
    if (analysisComplete && uploadedFiles.length <= 1) {
      setAnalysisComplete(false);
    }
  };

  const removeAllFiles = () => {
    setUploadedFiles([]);
    setSelectedPhotos([]);
    setAnalysisComplete(false);
    setBestPhotoName(null);
    setBestPhotoId(null);
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setSecondAiResult(null);

    if (
      category === "portraits" ||
      category === "animals" ||
      category === "landscapes"
    ) {
      try {
        let apiUrl = '/api/gemini';
        if (category === "animals") {
          apiUrl = '/api/gemini-animals';
        } else if (category === "landscapes") {
          apiUrl = '/api/gemini-landscapes';
        }

        const filesForApi = await Promise.all(
          uploadedFiles.map(async (file) => ({
            name: file.file.name,
            type: file.file.type,
            data: await new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.readAsDataURL(file.file);
            }).then(dataUrl => dataUrl.split(',')[1])
          }))
        );

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ files: filesForApi }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'AI analysis failed.');
        }

        const result = await response.json();
        console.log("First AI analysis result:", result);

        if (result.reason) {
           setFirstAiOutput(result.reason);
        }

        if (result.bestPhotoId) {
          const bestPhoto = uploadedFiles.find(file => file.file.name === result.bestPhotoId);
          if (bestPhoto) {
             const updatedFiles = uploadedFiles.map((file) => ({
                ...file,
                aiSelected: file.id === bestPhoto.id,
              }));
              setUploadedFiles(updatedFiles);
              setSelectedPhotos([bestPhoto.id]);
              setBestPhotoName(bestPhoto.file.name);
              setBestPhotoId(bestPhoto.id);
              setAnalysisComplete(true);
              toast.success(`Best photo selected by AI: ${bestPhoto.file.name}`);
          } else {
             toast.error("AI selected photo not found in uploaded files.");
             setBestPhotoName(null);
             setBestPhotoId(null);
          }
        } else {
          toast.error("AI analysis did not return a best photo.");
          setBestPhotoName(null);
          setBestPhotoId(null);
        }

      } catch (error) {
        console.error("Analysis error:", error);
        toast.error("An error occurred during AI analysis.");
        setBestPhotoName(null);
        setBestPhotoId(null);
      } finally {
        setIsAnalyzing(false);
      }
      return;
    }

    console.log("Other category analysis not yet implemented:", category);
    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setAnalysisComplete(false);
    setSelectedPhotos([]);
    setBestPhotoName(null);
    setBestPhotoId(null);
    setUploadedFiles((prev) =>
      prev.map((file) => ({
        ...file,
        aiSelected: undefined,
      }))
    );
  };

  const togglePhotoSelection = (photoId: string) => {
    setSelectedPhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  const getCategorySpecificMessage = () => {
    const messages = {
      portraits:
        "Upload your portrait photos for professional headshot analysis",
      landscapes:
        "Upload your landscape photos for composition and lighting analysis",
      animals: "Upload your animal photos for pose and expression evaluation",
    };
    return (
      messages[category as keyof typeof messages] ||
      "Upload your photos for AI analysis"
    );
  };

  const bestPhotos = uploadedFiles.filter((file) => file.aiSelected);
  const otherPhotos = uploadedFiles.filter((file) => !file.aiSelected);

  const deleteOtherPhotos = () => {
    setUploadedFiles((prev) =>
      prev.filter((file) => selectedPhotos.includes(file.id))
    );
  };

  const submitFeedback = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!feedbackText.trim() || !user) {
      toast.error("You must be logged in to submit feedback.");
      return;
    }
  
    setIsSubmittingFeedback(true);
    setIsAnalyzing(true);
    setSecondAiResult(null);
  
    try {
      let apiUrl = '/api/gemini';
      if (category === "animals") {
        apiUrl = '/api/gemini-animals';
      } else if (category === "landscapes") {
        apiUrl = '/api/gemini-landscapes';
      }

      const filesForApi = await Promise.all(
        uploadedFiles.map(async (file) => ({
          name: file.file.name,
          type: file.file.type,
          data: await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file.file);
          }).then(dataUrl => dataUrl.split(',')[1])
        }))
      );
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          files: filesForApi, 
          feedback: feedbackText,
          firstOutput: firstAiOutput
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Second AI analysis failed.');
      }
  
      const result = await response.json();
      console.log("Second AI analysis result:", result);
  
      setSecondAiResult(result);
      toast.success("Second AI analysis complete!");
  
      if (result.bestPhotoId) {
        const newBestPhoto = uploadedFiles.find(file => file.file.name === result.bestPhotoId);
  
        if (newBestPhoto) {
          const updatedFiles = uploadedFiles.map((file) => ({
            ...file,
            aiSelected: file.id === newBestPhoto.id,
          }));
          setUploadedFiles(updatedFiles);
          setSelectedPhotos([newBestPhoto.id]);
          setBestPhotoName(newBestPhoto.file.name);
          setBestPhotoId(newBestPhoto.id);
          toast.success(`AI updated best photo based on feedback: ${newBestPhoto.file.name}`);
        } else {
          toast.error("AI selected photo not found in uploaded files after feedback.");
          setBestPhotoName(null);
          setBestPhotoId(null);
        }
      } else {
        const updatedFiles = uploadedFiles.map((file) => ({
          ...file,
          aiSelected: undefined,
        }));
        setUploadedFiles(updatedFiles);
        setSelectedPhotos([]);
        setBestPhotoName(null);
        setBestPhotoId(null);
        toast.success("AI analysis did not return a best photo after feedback.");
      }
  
      setShowFeedback(false);
    } catch (error: any) {
      console.error("Second analysis error:", error);
      toast.error(`An error occurred during second AI analysis: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
      setIsSubmittingFeedback(false);
      setFeedbackText("");
    }
  };
  
  const bestPhoto = uploadedFiles.find((file) => file.id === bestPhotoId);
  const bestPhotoPreview = bestPhoto?.preview;
  
  const handleAcceptAIChoice = () => {
    const selectedBestPhoto = uploadedFiles.find(
      (file) => file.id === bestPhotoId
    );

    if (selectedBestPhoto) {
      setSelectedBestPhotoUrl(selectedBestPhoto.preview);
      setShowCard(true);
    } else {
      console.warn(
        "Best photo not found for category:",
        category,
        "with ID:",
        bestPhotoId
      );
      toast.error("Could not find the selected best photo.");
    }
  };

  async function upscalePhoto(publicId: string): Promise<{
    error: string;
    upscaledUrl: string;
  }> {
    const res = await fetch("/api/cloudinary/upscale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id: publicId, factor: 2 }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Upscale API hatası:", errorText);
      throw new Error("Upscale işlemi başarısız.");
    }

    return res.json();
  }

  async function backgroundRemove(publicId: string) {
    const res = await fetch("/api/cloudinary/remove-bg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id: publicId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      const errorMessage = errorData.error || "Background removal failed";
      throw new Error(`Background removal failed with status ${res.status}: ${errorMessage}`);
    }

    return res.json();
  }

  async function handleBackgroundRemove() {
    console.log("[handleBackgroundRemove] called.");
    console.log("[handleBackgroundRemove] selectedBestPhotoUrl:", selectedBestPhotoUrl);

    if (!selectedBestPhotoUrl) {
      console.error("[handleBackgroundRemove] No selectedBestPhotoUrl found.");
      return;
    }

    try {
      setIsProcessing(true);

      console.log("[handleBackgroundRemove] Fetching image from URL:", selectedBestPhotoUrl);
      const response = await fetch(selectedBestPhotoUrl);
      const blob = await response.blob();
      const file = new File([blob], "photo.jpg", { type: blob.type });
      console.log("[handleBackgroundRemove] Image fetched as File:", file);

      console.log("[handleBackgroundRemove] Uploading file to Cloudinary...");
      const publicId = await uploadToCloudinary(file);
      console.log("[handleBackgroundRemove] Cloudinary public_id:", publicId);

      console.log("[handleBackgroundRemove] Calling background removal API with public_id:", publicId);
      const data = await backgroundRemove(publicId);
      console.log("[handleBackgroundRemove] Background removed API response data:", data);

      if (data.bgRemovedUrl) {
        setBgRemovedUrl(data.bgRemovedUrl);
        setShowBgRemovedImageInDialog(true);
        console.log("[handleBackgroundRemove] bgRemovedUrl set:", data.bgRemovedUrl);
      } else {
        alert("Background removal failed: " + data.error);
        console.error("[handleBackgroundRemove] Background removal failed with error:", data.error);
      }
    } catch (error: any) {
      console.error("[handleBackgroundRemove] Error during background removal:", error.message);
      if (error.message.includes("420")) {
        console.error("Cloudinary Rate Limit Exceeded or Feature Not Available. Status 420.");
        alert("Arka plan kaldırma işlemi şu anda kısıtlanmıştır. Lütfen daha sonra tekrar deneyin veya Cloudinary hesabınızı kontrol edin.");
      } else {
        alert("Görsel işleme başarısız oldu: " + error.message);
      }
    } finally {
      setIsProcessing(false);
      console.log("[handleBackgroundRemove] Processing finished. isProcessing set to false.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Analysis Results Modal */}
      {analysisComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-5xl border-cyan-500 bg-white dark:bg-gray-950 shadow-xl max-h-[90vh] overflow-y-auto rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xl font-semibold">
                  <Check className="h-6 w-6 text-green-500" />
                  AI Selection Results
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetAnalysis}
                  aria-label="Start over"
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  Start Over
                </Button>
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              <section>
                <h3 className="text-lg font-medium mb-4">
                  Best {bestPhotos.length > 1 ? "Photos" : "Photo"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bestPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative border-2 border-green-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      <img
                        src={photo.preview}
                        alt="AI selected best photo"
                        className="w-full h-64 object-cover"
                        loading="lazy"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />

                      <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1">
                        <Checkbox
                          checked={selectedPhotos.includes(photo.id)}
                          onCheckedChange={() => togglePhotoSelection(photo.id)}
                          aria-label={`Select photo ${photo.file.name}`}
                          className="h-6 w-6"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3 flex items-center justify-between">
                        <p
                          className="text-white text-sm truncate max-w-[80%]"
                          title={photo.file.name}
                        >
                          {photo.file.name}
                        </p>
                        {selectedPhotos.includes(photo.id) && (
                          <Badge className="bg-green-500">Selected</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {otherPhotos.length > 0 && (
                <section>
                  <h3 className="text-lg font-medium mb-3">Other Photos</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {otherPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150"
                      >
                        <img
                          src={photo.preview}
                          alt={photo.file.name}
                          className="w-full h-24 object-cover"
                          loading="lazy"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            (e.target as HTMLImageElement).src = "/placeholder.svg";
                          }}
                        />
                        <div className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-0.5">
                          <Checkbox
                            checked={selectedPhotos.includes(photo.id)}
                            onCheckedChange={() =>
                              togglePhotoSelection(photo.id)
                            }
                            aria-label={`Select photo ${photo.file.name}`}
                            className="h-4 w-4"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="flex flex-wrap gap-4 justify-center mt-6">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-6"
                  onClick={() => {
                    handleAcceptAIChoice();
                  }}
                  aria-label="Accept AI selection"
                >
                  <Check className="h-5 w-5" />
                  Accept AI Choice
                </Button>
                <Button
                  variant="outline"
                  onClick={resetAnalysis}
                  className="flex items-center gap-2 px-5"
                  aria-label="Select photos again"
                >
                  <RefreshCw className="h-5 w-5" />
                  Select Again
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowFeedback(true)}
                  className="flex items-center gap-2 px-5"
                  aria-label="Give feedback to AI"
                >
                  <ThumbsUp className="h-5 w-5" />
                  Give Feedback to AI
                </Button>
                <Button
                  variant="destructive"
                  onClick={deleteOtherPhotos}
                  disabled={otherPhotos.length === 0}
                  className="flex items-center gap-2 px-5"
                  aria-label="Delete other photos"
                >
                  <Trash2 className="h-5 w-5" />
                  Delete Other Photos ({otherPhotos.length})
                </Button>
              </div>
              <Dialog open={showCard} onOpenChange={setShowCard}>
                <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
                  <DialogHeader className="pt-10">
                    <DialogTitle className="text-center">
                      Selected Best Photo
                    </DialogTitle>
                  </DialogHeader>
                  {selectedBestPhotoUrl ? (
                    <div className="flex flex-row items-start p-4 gap-4 w-full">
                      <div className="flex-grow min-w-0">
                        <img
                          src={selectedBestPhotoUrl}
                          alt="Best Photo"
                          className="w-full h-auto rounded-md mb-4 object-contain max-h-[70vh]"
                        />
                      </div>
                      <div className="flex flex-col h-full justify-between gap-4">
                        <Button
                          variant="outline"
                          disabled={isUpscaling}
                          onClick={async () => {
                            if (!selectedBestPhotoUrl) return;

                            try {
                              setIsUpscaling(true);

                              const response = await fetch(selectedBestPhotoUrl);
                              const blob = await response.blob();
                              const file = new File([blob], "photo.jpg", { type: blob.type });

                              const publicId = await uploadToCloudinary(file);
                              console.log("Cloudinary public_id:", publicId);

                              const data = await upscalePhoto(publicId);
                              console.log("Upscaled URL:", data.upscaledUrl);

                              if (data.upscaledUrl) {
                                setUpscaledUrl(data.upscaledUrl);
                              } else {
                                alert("Upscale başarısız: " + data.error);
                              }
                            } catch (error) {
                              console.error("Hata:", error);
                              alert("Görsel işlenemedi.");
                            } finally {
                              setIsUpscaling(false);
                            }
                          }}
                          className="bg-purple-600 text-white border border-purple-600 hover:bg-transparent hover:text-purple-600 hover:border-purple-600"
                        >
                          {isUpscaling ? "Upscaling..." : "Upscale & View"}
                        </Button>

                        {upscaledUrl && (
                          <Dialog
                            open={!!upscaledUrl}
                            onOpenChange={() => setUpscaledUrl(null)}
                          >
                            <DialogContent className="max-w-5xl">
                              <DialogHeader>
                                <DialogTitle>Upscale Comparison</DialogTitle>
                                <DialogDescription>
                                  Original photo on the left, AI-enhanced
                                  version on the right.
                                </DialogDescription>
                              </DialogHeader>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="text-center">
                                  <p className="mb-2 font-medium">
                                    Original Photo
                                  </p>
                                  <img
                                    src={selectedBestPhotoUrl}
                                    alt="Original"
                                    className="w-full h-auto rounded-md border"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                                    }}
                                  />
                                </div>

                                <div className="text-center">
                                  <p className="mb-2 font-medium">
                                    Upscaled Photo
                                  </p>
                                  <img
                                    src={upscaledUrl}
                                    alt="Upscaled"
                                    className="w-full h-auto rounded-md border"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="mt-4 flex justify-end gap-2">
                                <Button
                                  variant="secondary"
                                  onClick={() => setUpscaledUrl(null)}
                                >
                                  Close
                                </Button>

                                <Button
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={async () => {
                                    if (!upscaledUrl) return;

                                    try {
                                      const response = await fetch(upscaledUrl, { mode: "cors" });
                                      if (!response.ok) throw new Error("Failed to fetch image");

                                      const blob = await response.blob();
                                      const url = window.URL.createObjectURL(blob);

                                      const link = document.createElement("a");
                                      link.href = url;

                                      const urlParts = upscaledUrl.split("/");
                                      const filename = urlParts[urlParts.length - 1] || "upscaled_photo.jpg";
                                      link.download = filename;

                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);

                                      window.URL.revokeObjectURL(url);
                                    } catch (error) {
                                      alert("Download failed: ");
                                      console.error(error);
                                    }
                                  }}
                                >
                                  Download
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        <Button
                          variant="outline"
                          disabled={isProcessing}
                          onClick={handleBackgroundRemove}
                          className="bg-amber-900 text-white border border-amber-900 hover:bg-transparent hover:text-amber-900 hover:border-amber-900"
                        >
                          {isProcessing
                            ? "Removing Background..."
                            : "Remove Background & View"}
                        </Button>

                        {showBgRemovedImageInDialog && (
                          <Dialog
                            open={showBgRemovedImageInDialog}
                            onOpenChange={() => setShowBgRemovedImageInDialog(false)}
                          >
                            <DialogContent className="max-w-5xl">
                              <DialogHeader>
                                <DialogTitle>Background Removal Comparison</DialogTitle>
                                <DialogDescription>
                                  Original photo on the left, background removed
                                  version on the right.
                                </DialogDescription>
                              </DialogHeader>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div className="text-center">
                                  <p className="mb-2 font-medium">
                                    Original Photo
                                  </p>
                                  <img
                                    src={selectedBestPhotoUrl || ""}
                                    alt="Original"
                                    className="w-full h-auto rounded-md border"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                                    }}
                                  />
                                </div>

                                <div className="text-center">
                                  <p className="mb-2 font-medium">
                                    Background Removed Photo
                                  </p>
                                  <img
                                    src={bgRemovedUrl || ""}
                                    alt="Background Removed"
                                    className="w-full h-auto rounded-md border"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="mt-4 flex justify-end gap-2">
                                <Button
                                  variant="secondary"
                                  onClick={() => setShowBgRemovedImageInDialog(false)}
                                >
                                  Close
                                </Button>
                                <Button
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={async () => {
                                    if (!bgRemovedUrl) return;

                                    try {
                                      const response = await fetch(bgRemovedUrl, { mode: "cors" });
                                      if (!response.ok) throw new Error("Failed to fetch image");

                                      const blob = await response.blob();
                                      const url = window.URL.createObjectURL(blob);

                                      const link = document.createElement("a");
                                      link.href = url;

                                      // Correctly parse the URL to get the pathname before extracting filename
                                      const parsedUrl = new URL(bgRemovedUrl);
                                      const pathnameParts = parsedUrl.pathname.split("/");
                                      const filename = pathnameParts[pathnameParts.length - 1] || "bg_removed_photo.png";

                                      link.download = filename;

                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);

                                      window.URL.revokeObjectURL(url);
                                    } catch (error) {
                                      alert("Download failed");
                                      console.error(error);
                                    }
                                  }}
                                >
                                  Download
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}

                        <div className="mt-auto mb-4 flex flex-col gap-4">
                          <Button
                            variant="outline"
                            onClick={() => setShowCard(false)}
                            className="text-white-600 border-red-600 hover:bg-transparent hover:text-red-600 hover:border-red-600 bg-red-600"
                          >
                            Cancel
                          </Button>

                          <Button
                            onClick={() => {
                              const link = document.createElement("a");
                              if (selectedBestPhotoUrl) {
                                link.href = selectedBestPhotoUrl;
                                const urlParts = selectedBestPhotoUrl.split("/");
                                const filename = urlParts[urlParts.length - 1] || "best_photo.jpg";
                                link.download = filename;
                                link.click();
                              }
                            }}
                            className="bg-green-600 text-white border-0 hover:bg-transparent hover:text-green-600 hover:border hover:border-green-600"
                          >
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[30vh] text-muted-foreground">
                      No photo selected.
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      )}

      {!analysisComplete && (
        <div className="bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-cyan-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-cyan-900 dark:text-cyan-100 mb-2">
                {config.name} Upload Tips
              </h4>
              <p className="text-sm text-cyan-700 dark:text-cyan-300 mb-3">
                {getCategorySpecificMessage()}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {config.tips.slice(0, 2).map((tip, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Camera className="h-3 w-3 text-cyan-600 mt-1 flex-shrink-0" />
                    <span className="text-xs text-cyan-700 dark:text-cyan-300">
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!analysisComplete && (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragActive
              ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-950"
              : "border-gray-300 hover:border-gray-400"
          )}
        >
          <input {...(getInputProps() as JSX.IntrinsicElements["input"])} />

          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            {isDragActive
              ? `Drop your ${config.name.toLowerCase()} here`
              : `Upload ${config.name}`}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Drag and drop your {config.name.toLowerCase()} here, or click to
            browse
          </p>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Choose {config.name}
          </Button>
          <p className="text-xs text-gray-400 mt-2">
            Supports: JPG, PNG, GIF, BMP, WEBP, HEIC (Max 10MB each)
          </p>
        </div>
      )}

      {uploadedFiles.length > 0 && !analysisComplete && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              Uploaded {config.name} ({uploadedFiles.length})
            </h3>
            {uploadedFiles.some((f) => f.status === "completed") && (
              <div className="flex items-center gap-3">
                {uploadedFiles.length > 1 && (
                  <Button
                    variant="destructive"
                    onClick={removeAllFiles}
                    size="sm"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove All Photos
                  </Button>
                )}
                

                <Button
                  className="bg-cyan-600 hover:bg-cyan-700"
                  onClick={startAnalysis}
                  disabled={
                    isAnalyzing ||
                    uploadedFiles.some((f) => f.status !== "completed")
                  }
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border">
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="w-full h-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-end p-1">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">
                      {file.file.name}
                    </p>
                    <Badge
                      variant={
                        file.status === "completed"
                          ? "default"
                          : file.status === "error"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {file.status === "completed" && (
                        <Check className="h-3 w-3 mr-1" />
                      )}
                      {file.status === "error" && (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {file.status === "uploading" && (
                        <Upload className="h-3 w-3 mr-1" />
                      )}
                      {file.status}
                    </Badge>
                  </div>
                  {file.status === "uploading" && (
                    <Progress value={file.progress} className="h-1" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg border-blue-500 bg-blue-50 dark:bg-blue-950 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-blue-500" />
                  Give Feedback to AI
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFeedback(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="feedback">Your Feedback</Label>
                <textarea
                  id="feedback"
                  placeholder="Tell us how the AI selection performed. What did it get right? What could be improved?"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowFeedback(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitFeedback}
                  disabled={!feedbackText.trim() || isSubmittingFeedback}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmittingFeedback ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Evaluating Feedback...
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
