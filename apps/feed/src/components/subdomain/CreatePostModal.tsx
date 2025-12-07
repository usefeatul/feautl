"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@feedgot/ui/components/dialog"
import { getInitials } from "@/utils/user-utils"
import { PostHeader } from "../post/PostHeader"
import { PostContent } from "../post/PostContent"
import { PostFooter } from "../post/PostFooter"
import { useCreatePostData } from "../../hooks/useCreatePostData"
import { usePostSubmission } from "../../hooks/usePostSubmission"
import { usePostImageUpload } from "../../hooks/usePostImageUpload"

interface CreatePostModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workspaceSlug: string
  boardSlug: string
}

export default function CreatePostModal({
  open,
  onOpenChange,
  workspaceSlug,
  boardSlug,
}: CreatePostModalProps) {
  const { user, boards, selectedBoard, setSelectedBoard } = useCreatePostData({
    open,
    workspaceSlug,
    boardSlug
  })

  const {
    uploadedImage,
    uploadingImage,
    fileInputRef,
    setUploadedImage,
    handleFileSelect,
    handleRemoveImage,
    ALLOWED_IMAGE_TYPES,
  } = usePostImageUpload(workspaceSlug)

  const {
    title,
    setTitle,
    content,
    setContent,
    isPending,
    submitPost
  } = usePostSubmission({
    workspaceSlug,
    onSuccess: () => {
      onOpenChange(false)
      setUploadedImage(null)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitPost(selectedBoard, user, uploadedImage?.url)
  }

  const initials = user?.name ? getInitials(user.name) : "?"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden border-none shadow-2xl top-[20%] translate-y-[-20%]">
        <DialogTitle className="sr-only">Create a Post</DialogTitle>
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <PostHeader
            user={user}
            initials={initials}
            boards={boards}
            selectedBoard={selectedBoard}
            onSelectBoard={setSelectedBoard}
            onClose={() => onOpenChange(false)}
          />
          
          <PostContent
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            uploadedImage={uploadedImage}
            uploadingImage={uploadingImage}
            handleRemoveImage={handleRemoveImage}
          />

          <PostFooter
            isPending={isPending}
            disabled={!title || !content || !selectedBoard || isPending || uploadingImage}
            uploadedImage={uploadedImage}
            uploadingImage={uploadingImage}
            fileInputRef={fileInputRef}
            handleFileSelect={handleFileSelect}
            ALLOWED_IMAGE_TYPES={ALLOWED_IMAGE_TYPES}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}
