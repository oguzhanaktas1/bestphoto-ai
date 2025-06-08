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

import { Download, Scissors, Wand2, ImageIcon, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary/uploadToCloudinary";
import { BackgroundRemoveDialog } from "@/components/remove-background/background-remove-dialog";

interface ProcessedImage {
  id: string;
  original: string;
  processed: string;
  name: string;
}

export function RemoveBackgroundContent() {
  const [uploadedPhotos, setUploadedPhotos] = useState<
    { id: string; url: string; name: string }[]
  >([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bgRemovedUrl, setBgRemovedUrl] = useState<string | null>(null);
  const [isBackgroundRemoveDialogOpen, setIsBackgroundRemoveDialogOpen] = useState(false);

  const handleUpload = (
    photo?: { id: string; file: File; preview: string; name: string }
  ) => {
    if (photo) {
      setSelectedFile(photo.file);
      setPreviewUrl(photo.preview);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
    setBgRemovedUrl(null);
    setError(null);
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setBgRemovedUrl(null);

    try {
      const publicId = await uploadToCloudinary(selectedFile);
      console.log("Cloudinary public_id:", publicId);

      const response = await fetch("/api/cloudinary/remove-bg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: publicId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove background.");
      }

      const data = await response.json();
      setBgRemovedUrl(data.bgRemovedUrl);
      setIsBackgroundRemoveDialogOpen(true);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred during background removal.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (imageUrl: string, fileName: string) => {
    console.log("handleDownload in remove-background-content is deprecated.");
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
                <BreadcrumbPage>Remove Background</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-red-500 text-white">
                <Scissors className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-2xl">Remove Background</CardTitle>
                <CardDescription className="text-base">
                  Remove backgrounds from your photos with AI
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Photos</CardTitle>
            <CardDescription>Select photos to process</CardDescription>
          </CardHeader>
          <CardContent>
            <PhotoUploadArea
              onUploadComplete={handleUpload}
              mode="remove-background"
              onProcess={handleRemoveBackground}
              isProcessing={isProcessing}
            />
          </CardContent>
        </Card>

        {error && (
          <div className="text-red-500 text-center text-sm mt-4">{error}</div>
        )}
      </div>
      <BackgroundRemoveDialog
        isOpen={isBackgroundRemoveDialogOpen}
        onClose={() => setIsBackgroundRemoveDialogOpen(false)}
        originalImage={previewUrl || ""}
        bgRemovedImage={bgRemovedUrl || ""}
        imageName={selectedFile?.name || ""}
      />
    </>
  );
}
