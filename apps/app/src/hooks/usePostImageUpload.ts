import { useState, useRef } from "react"
import { toast } from "sonner"
import { getPostImageUploadUrl } from "@/lib/post-service"

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"]
const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

export interface UploadedImage {
  url: string
  name: string
  type: string
}

export function usePostImageUpload(workspaceSlug: string, boardSlug?: string) {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (file: File) => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Unsupported file type. Please use PNG, JPEG, WebP, or GIF.")
      return
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image too large. Maximum size is 5MB.")
      return
    }

    setUploadingImage(true)
    const toastId = toast.loading("Uploading image...")

    try {
      const { uploadUrl, publicUrl } = await getPostImageUploadUrl(
        workspaceSlug,
        file.name,
        file.type,
        boardSlug
      )

      const res = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      })

      if (!res.ok) {
        throw new Error("Upload failed")
      }

      setUploadedImage({
        url: publicUrl,
        name: file.name,
        type: file.type,
      })
      toast.success("Image uploaded", { id: toastId })
    } catch (error: any) {
      toast.error(error?.message || "Failed to upload image", { id: toastId })
    } finally {
      setUploadingImage(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
  }

  return {
    uploadedImage,
    uploadingImage,
    fileInputRef,
    setUploadedImage,
    handleFileSelect,
    handleRemoveImage,
    ALLOWED_IMAGE_TYPES,
  }
}
