"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Download,
  Trash2,
  Eye,
  Heart,
  Share2,
  ImageIcon,
  Upload,
} from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import { toast } from "react-hot-toast";

export function MyPhotosContent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  async function fetchUploads() {
    const res = await fetch("/api/list-uploads");
    if (res.ok) {
      const data = await res.json();
      setUploadedFiles(data.files || []);
    }
  }

  useEffect(() => {
    fetchUploads();
  }, []);

  const togglePhotoSelection = (photoId: string) => {
    setSelectedPhotos((prev) =>
      prev.includes(photoId)
        ? prev.filter((id) => id !== photoId)
        : [...prev, photoId]
    );
  };

  const toggleFavorite = (photoId: string) => {
    
    console.log(`Toggle favorite for photo ${photoId}`);
  };

  const handleDeletePhotos = async () => {
    console.log("Deleting selected photos:", selectedPhotos);

    try {
      const response = await fetch('/api/delete-uploads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filenames: selectedPhotos }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete photos.');
      }

      const result = await response.json();
      console.log("Deletion results:", result);

      
      const failedDeletions = result.results.filter((r: any) => !r.success);
      if (failedDeletions.length > 0) {
        
        toast.error(`Failed to delete ${failedDeletions.length} photo(s).`);
      } else {
        toast.success("Selected photos deleted successfully!");
      }

      
      await fetchUploads();
      setSelectedPhotos([]);

    } catch (error) {
      console.error("Error during photo deletion:", error);
      toast.error("An error occurred while deleting photos.");
    }
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                <BreadcrumbPage>My Photos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          {selectedPhotos.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeletePhotos}
              disabled={selectedPhotos.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete ({selectedPhotos.length})
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid3X3 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Photos</h1>
            <p className="text-muted-foreground">
              Manage and view all your uploaded photos ({uploadedFiles.length} photos)
            </p>
          </div>
        </div>

        {/* Photos Grid/List */}
        {uploadedFiles.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {uploadedFiles.map((filename) => (
                <Card
                  key={filename}
                  className="group cursor-pointer hover:shadow-lg transition-all"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={`/my-photos/${filename}`}
                        alt={filename}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <input
                          type="checkbox"
                          checked={selectedPhotos.includes(filename)}
                          onChange={() => togglePhotoSelection(filename)}
                          className="w-4 h-4 rounded border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm truncate">
                        {filename}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {uploadedFiles.map((filename) => (
                    <div
                      key={filename}
                      className="flex items-center gap-4 p-4 hover:bg-muted/50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPhotos.includes(filename)}
                        onChange={() => togglePhotoSelection(filename)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <img
                        src={`/uploads/${filename}`}
                        alt={filename}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{filename}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No photos found</h3>
              <p className="text-muted-foreground mb-4">
                You haven't uploaded any photos yet.
              </p>
              
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
