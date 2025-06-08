"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface BackgroundRemoveDialogProps {
  isOpen: boolean
  onClose: () => void
  originalImage: string | null
  bgRemovedImage: string | null
  imageName: string
}

export function BackgroundRemoveDialog({
  isOpen,
  onClose,
  originalImage,
  bgRemovedImage,
  imageName,
}: BackgroundRemoveDialogProps) {
  const handleDownload = async (imageUrl: string | null, prefix: string) => {
    if (!imageUrl) return;

    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      if (!response.ok) throw new Error("Failed to fetch image for download.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      
      const parsedUrl = new URL(imageUrl);
      const pathnameParts = parsedUrl.pathname.split("/");
      let filename = pathnameParts[pathnameParts.length - 1] || "bg_removed_photo.png";
      
     
      if (!filename.toLowerCase().endsWith(".png")) {
        filename = filename.split('.')[0] + ".png";
      }

      link.download = `${prefix}-${filename}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Görsel indirilemedi.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Background Removal Comparison</DialogTitle>
          <DialogDescription>
            Original photo on the left, background-removed version on the right.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {originalImage && (
            <div className="flex flex-col items-center gap-2">
              <h4 className="font-semibold">Original Image</h4>
              <Image
                src={originalImage}
                alt="Original"
                width={400}
                height={400}
                objectFit="contain"
                className="max-w-full h-auto rounded-md border"
              />
            </div>
          )}

          {bgRemovedImage && (
            <div className="flex flex-col items-center gap-2">
              <h4 className="font-semibold">Background Removed Image</h4>
              <Image
                src={bgRemovedImage}
                alt="Background Removed"
                width={400}
                height={400}
                objectFit="contain"
                className="max-w-full h-auto rounded-md border"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          {bgRemovedImage && (
            <Button onClick={() => handleDownload(bgRemovedImage, "bg-removed")}>
              <Download className="h-4 w-4 mr-2" /> Download Background Removed Image
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
