"use client"

import { useState, useRef, KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { OutputData } from "@editorjs/editorjs"
import dynamic from "next/dynamic"
import { Button } from "@oreilla/ui/components/button"
import { toast } from "sonner"
import { client } from "@oreilla/api/client"
import { Image as ImageIcon, X } from "lucide-react"

// Dynamically import EditorJS to avoid SSR issues
const EditorJSComponent = dynamic(() => import("./EditorJS"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-muted-foreground">Loading editor...</div>
    </div>
  ),
})

interface ChangelogEditorProps {
  slug: string
  initialData?: {
    id?: string
    title?: string
    summary?: string
    content?: OutputData
    coverImage?: string
    tags?: string[]
    status?: "draft" | "published" | "archived"
  }
}

export default function ChangelogEditor({ slug, initialData }: ChangelogEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || "")
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "")
  const [showCoverInput, setShowCoverInput] = useState(false)
  const [content, setContent] = useState<OutputData | undefined>(initialData?.content)
  const [isSaving, setIsSaving] = useState(false)
  const titleRef = useRef<HTMLTextAreaElement>(null)

  const handleTitleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      // Focus on editor (EditorJS will handle this)
    }
  }

  const autoResizeTitle = () => {
    const textarea = titleRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = textarea.scrollHeight + "px"
    }
  }

  const handleSave = async (saveStatus: "draft" | "published") => {
    if (!title.trim()) {
      toast.error("Please enter a title")
      return
    }

    if (!content || content.blocks.length === 0) {
      toast.error("Please add some content")
      return
    }

    setIsSaving(true)

    try {
      if (initialData?.id) {
        // Update existing changelog
        const response = await client.changelog.update.$post({
          id: initialData.id,
          title: title.trim(),
          content,
          coverImage: coverImage.trim() || undefined,
          status: saveStatus,
        })

        if (response.ok) {
          toast.success(saveStatus === "published" ? "Changelog published!" : "Changelog saved!")
          router.push(`/workspaces/${slug}/changelog`)
          router.refresh()
        }
      } else {
        // Create new changelog
        const response = await client.changelog.create.$post({
          slug,
          title: title.trim(),
          content,
          coverImage: coverImage.trim() || undefined,
          status: saveStatus,
        })

        if (response.ok) {
          toast.success(saveStatus === "published" ? "Changelog published!" : "Changelog saved!")
          router.push(`/workspaces/${slug}/changelog`)
          router.refresh()
        }
      }
    } catch (error) {
      console.error("Error saving changelog:", error)
      toast.error("Failed to save changelog")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="relative">
      {/* Page-like Editor */}
      <div className="max-w-4xl mx-auto px-8 py-8 pb-32">
        {/* Action Bar */}
        <div className="flex items-center justify-end gap-3 mb-8 pb-4 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/workspaces/${slug}/changelog`)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSave("draft")}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
          <Button
            size="sm"
            onClick={() => handleSave("published")}
            disabled={isSaving}
          >
            {isSaving ? "Publishing..." : "Publish"}
          </Button>
        </div>
        {/* Cover Image */}
        {coverImage ? (
          <div className="relative -mx-8 mb-12 group">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-80 object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setCoverImage("")}
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setShowCoverInput(true)}
            >
              Change cover
            </Button>
          </div>
        ) : (
          <div className="mb-8">
            {showCoverInput ? (
              <div className="flex gap-2 mb-4">
                <input
                  type="url"
                  placeholder="Paste image URL..."
                  className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const input = e.currentTarget
                      setCoverImage(input.value)
                      setShowCoverInput(false)
                    } else if (e.key === "Escape") {
                      setShowCoverInput(false)
                    }
                  }}
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCoverInput(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <button
                onClick={() => setShowCoverInput(true)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ImageIcon className="w-4 h-4" />
                Add cover
              </button>
            )}
          </div>
        )}

        {/* Title */}
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            autoResizeTitle()
          }}
          onKeyDown={handleTitleKeyDown}
          placeholder="Untitled"
          className="w-full text-5xl font-bold placeholder:text-muted-foreground/40 focus:outline-none resize-none overflow-hidden bg-transparent border-none mb-4"
          rows={1}
          style={{ minHeight: "1.2em" }}
        />

        {/* Subtle hint */}
        <div className="text-sm text-muted-foreground mb-8">
          Press <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">↵</kbd> to continue or{" "}
          <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">/</kbd> for commands
        </div>

        {/* Editor */}
        <div className="prose prose-lg max-w-none">
          <EditorJSComponent
            data={content}
            onChange={setContent}
            placeholder="Start writing your changelog..."
          />
        </div>
      </div>
    </div>
  )
}


