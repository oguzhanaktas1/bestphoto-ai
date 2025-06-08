"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PhotoUploadArea } from "@/components/photo-upload-area";

import { Download, Wand2, ImageIcon, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { ComparisonDialog } from "@/components/upscale/comparison-dialog";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadToCloudinary";

interface ProcessedImage {
  id: string;
  original: string;
  processed: string;
  name: string;
}

export function UpscalePhotoContent() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [upscaledImageUrl, setUpscaledImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isComparisonDialogOpen, setIsComparisonDialogOpen] = useState(false);

  const handleUpload = (
    photo?: { id: string; file: File; preview: string; name: string }
  ) => {
    console.log("handleUpload called with photo:", photo);
    if (photo) {
      setSelectedFile(photo.file);
      setPreviewUrl(photo.preview);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
    setUpscaledImageUrl(null);
    setError(null);
  };

  const handleUpscale = async () => {
    console.log("handleUpscale called.");
    console.log("selectedFile before check:", selectedFile);
    if (!selectedFile) {
      setError("Please select an image first.");
      console.log("No file selected.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setUpscaledImageUrl(null);

    try {
      console.log("Calling uploadToCloudinary with file:", selectedFile);
      const publicId = await uploadToCloudinary(selectedFile);
      console.log("Cloudinary public_id received:", publicId);

      console.log("Calling /api/cloudinary/upscale with public_id:", publicId, "and factor: 2 (fixed)");
      const response = await fetch("/api/cloudinary/upscale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: publicId,
          factor: 2,
        }),
      });

      console.log("Upscale API response ok:", response.ok);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upscale API error data:", errorData);
        throw new Error(errorData.error || "Failed to upscale image.");
      }

      const data = await response.json();
      console.log("Upscale API success data:", data);
      setUpscaledImageUrl(data.upscaledUrl);
      setIsComparisonDialogOpen(true);
    } catch (err: any) {
      console.error("Upscale process caught error:", err);
      setError(err.message || "An unknown error occurred during upscaling.");
    } finally {
      console.log("Upscale process finished. isProcessing set to false.");
      setIsProcessing(false);
    }
  };

  const handleDownload = (image: ProcessedImage) => {
    // In a real app, you would download the processed image
    const link = document.createElement("a");
    link.href = image.processed;
    link.download = `upscaled-${image.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/desktop/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Upscale Photos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Upscale Photos Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-500 text-white">
                <Wand2 className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">Upscale Photos</CardTitle>
                <CardDescription className="text-base">
                  Enhance your photos with AI-powered upscaling
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Photos</CardTitle>
            <CardDescription>Select photos to upscale</CardDescription>
          </CardHeader>
          <CardContent>
            <PhotoUploadArea
              onUploadComplete={handleUpload}
              mode="upscale"
              onProcess={handleUpscale}
              isProcessing={isProcessing}
            />
          </CardContent>
        </Card>

        {error && (
          <div className="text-red-500 text-center text-sm mt-4">{error}</div>
        )}
      </div>

      <ComparisonDialog
        isOpen={isComparisonDialogOpen}
        onClose={() => setIsComparisonDialogOpen(false)}
        originalImage={previewUrl || ""}
        upscaledImage={upscaledImageUrl || ""}
        imageName={selectedFile?.name || ""}
      />
    </>
  );
}
