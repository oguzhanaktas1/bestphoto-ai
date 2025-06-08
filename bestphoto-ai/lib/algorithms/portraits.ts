import mime from "mime";
import toast from "react-hot-toast";

export interface UploadedFile {
  file: File;
  id: string;
  preview: string;
  status: string;
  progress?: number;
}

export async function selectBestPortraitPhoto(
  files: UploadedFile[]
): Promise<{
  reason: string; bestPhotoId: string | null; sortedPhotos: UploadedFile[] 
}> {
  if (!files || files.length === 0) {
    toast.error("Please upload at least one photo.");
    return { bestPhotoId: null, sortedPhotos: [], reason: "No files uploaded." };
  }

  // Filter only completed uploads
  const completedFiles = files.filter(f => f.status === "completed");
  
  if (completedFiles.length === 0) {
    toast.error("No completed uploads found.");
    return { bestPhotoId: null, sortedPhotos: [], reason: "No completed uploads found." };
  }

  try {
    // Convert files to base64 for API
    const base64Files = await Promise.all(
      completedFiles.map(async (uploadedFile) => {
        try {
          const arrayBuffer = await uploadedFile.file.arrayBuffer();
          const base64Data = Buffer.from(arrayBuffer).toString("base64");
          
          return {
            id: uploadedFile.id,
            name: uploadedFile.file.name,
            data: base64Data,
            type: mime.getType(uploadedFile.file.name) || "image/jpeg",
          };
        } catch (error) {
          console.error(`Error processing file ${uploadedFile.file.name}:`, error);
          throw error;
        }
      })
    );

    console.log(`Sending ${base64Files.length} files to Gemini API`);

    // Send to Gemini API
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files: base64Files }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      toast.error(`Server error: ${response.status} - ${errorText}`);
      return { bestPhotoId: null, sortedPhotos: [], reason: `Server error: ${response.status} - ${errorText}` };
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (!data.bestPhotoId && typeof data.bestPhotoIndex !== "number") {
      toast.error("AI could not determine the best photo.");
      return { bestPhotoId: null, sortedPhotos: [], reason: "AI could not determine the best photo." };
    }

    let bestPhoto = null;
    if (typeof data.bestPhotoIndex === "number" && data.bestPhotoIndex >= 0 && data.bestPhotoIndex < completedFiles.length) {
      bestPhoto = completedFiles[data.bestPhotoIndex];
    } else if (data.bestPhotoId) {
      bestPhoto = completedFiles.find(f => f.file.name.toLowerCase() === data.bestPhotoId.toLowerCase());
    }

    if (!bestPhoto) {
      console.error("Best photo not found:", {
        aiResponse: data.bestPhotoId,
        bestPhotoIndex: data.bestPhotoIndex,
        availableFiles: completedFiles.map(f => f.file.name)
      });
      toast.error("AI selected photo not found in uploaded files.");
      return { bestPhotoId: null, sortedPhotos: [], reason: "AI selected photo not found in uploaded files." };
    }

    console.log(`Best photo found: ${bestPhoto.file.name} (ID: ${bestPhoto.id})`);

    return {
      bestPhotoId: bestPhoto.id,
      sortedPhotos: completedFiles,
      reason: data.reason || "Best photo selected by AI.",
    };

  } catch (error) {
    console.error("Request error:", error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      toast.error("Network error. Please check your connection.");
      return { bestPhotoId: null, sortedPhotos: [], reason: "Network error. Please check your connection." };
    } else {
      toast.error("An error occurred during photo analysis.");
      return { bestPhotoId: null, sortedPhotos: [], reason: "An error occurred during photo analysis." };
    }
  }
}