"use client"

import React, { useState, useTransition, useRef } from "react"
import { Textarea } from "@feedgot/ui/components/textarea"
import { Button } from "@feedgot/ui/components/button"
import { client } from "@feedgot/api/client"
import { toast } from "sonner"
import { Loader2, Image as ImageIcon, X } from "lucide-react"
import { getCommentImageUploadUrl } from "@/lib/comment-service"
import { cn } from "@feedgot/ui/lib/utils"
import CommentImage from "./CommentImage"
import ClosedIcon from "@feedgot/ui/icons/closed"

interface CommentFormProps {
  postId: string
  parentId?: string
  onSuccess?: () => void
  onCancel?: () => void
  placeholder?: string
  autoFocus?: boolean
  buttonText?: string
}

export default function CommentForm({
  postId,
  parentId,
  onSuccess,
  onCancel,
  placeholder = "Write a comment...",
  autoFocus = false,
  buttonText = "Comment",
}: CommentFormProps) {
  const [content, setContent] = useState("")
  const [isPending, startTransition] = useTransition()
  const [uploadedImage, setUploadedImage] = useState<{ url: string; name: string; type: string } | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const allowedImageTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"]
  const maxImageSize = 5 * 1024 * 1024 // 5MB

  const handleImageUpload = async (file: File) => {
    if (!allowedImageTypes.includes(file.type)) {
      toast.error("Unsupported file type. Please use PNG, JPEG, WebP, or GIF.")
      return
    }
    if (file.size > maxImageSize) {
      toast.error("Image too large. Maximum size is 5MB.")
      return
    }

    setUploadingImage(true)
    const toastId = toast.loading("Uploading image...")

    try {
      const { uploadUrl, publicUrl } = await getCommentImageUploadUrl(
        postId,
        file.name,
        file.type
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if ((!content.trim() && !uploadedImage) || isPending) return

    startTransition(async () => {
      try {
        const metadata = uploadedImage
          ? {
              attachments: [
                {
                  name: uploadedImage.name,
                  url: uploadedImage.url,
                  type: uploadedImage.type,
                },
              ],
            }
          : undefined

        const res = await client.comment.create.$post({
          postId,
          content: content.trim() || "",
          ...(parentId ? { parentId } : {}),
          ...(metadata ? { metadata } : {}),
        })

        if (res.ok) {
          setContent("")
          setUploadedImage(null)
          toast.success(parentId ? "Reply posted" : "Comment posted")
          onSuccess?.()
        } else if (res.status === 401) {
          toast.error("Please sign in to comment")
        } else if (res.status === 403) {
          const data = await res.json()
          toast.error((data as any)?.message || "Comments are disabled")
        } else {
          toast.error("Failed to post comment")
        }
      } catch (error) {
        console.error("Failed to post comment:", error)
        toast.error("Failed to post comment")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="min-h-[60px] resize-none text-sm shadow-none"
        autoFocus={autoFocus}
        disabled={isPending || uploadingImage}
      />

      {/* Image Preview */}
      {uploadedImage && (
        <div className="relative inline-block">
          <div className="relative">
            <CommentImage
              url={uploadedImage.url}
              alt={uploadedImage.name}
              size="small"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-1 -right-1 rounded-full bg-destructive text-destructive-foreground p-0.5 hover:bg-destructive/90 transition-colors shadow-sm z-10 cursor-pointer"
              disabled={isPending || uploadingImage}
              aria-label="Remove image"
            >

              <ClosedIcon className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={allowedImageTypes.join(",")}
            onChange={handleFileSelect}
            className="hidden"
            disabled={isPending || uploadingImage}
          />
          <Button
            type="button"
            size="xs"
            variant="nav"
            className="h-8 w-8 p-0"
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending || uploadingImage || !!uploadedImage}
            aria-label="Add image"
          >
            {uploadingImage ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ImageIcon className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="submit"
            size="xs"
            variant="quiet"
            disabled={(!content.trim() && !uploadedImage) || isPending || uploadingImage}
          >
            {isPending && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            {buttonText}
          </Button>
          {onCancel && (
            <Button
              type="button"
              size="xs"
              variant="nav"
              onClick={onCancel}
              disabled={isPending || uploadingImage}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </form>
  )
}

