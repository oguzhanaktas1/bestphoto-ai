export async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bestphoto");
    formData.append("folder", "bestphoto");
  
    console.log("Attempting to upload file to Cloudinary...");
    const response = await fetch("https://api.cloudinary.com/v1_1/dayx1dbvs/image/upload", {
      method: "POST",
      body: formData,
    });
  
    const data = await response.json();
    console.log("Cloudinary upload response data:", data);
    if (!response.ok) {
      console.error("Cloudinary upload failed with error:", data.error?.message || "Unknown error");
      throw new Error(data.error?.message || "Yükleme başarısız");
    }
    console.log("File uploaded to Cloudinary, public_id:", data.public_id);
    return data.public_id;
  }
  