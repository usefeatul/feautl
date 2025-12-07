"use client"

import React, { useState, useTransition, useEffect } from "react"
import {
  Dialog,
  DialogContent,
} from "@feedgot/ui/components/dialog"
import { Button } from "@feedgot/ui/components/button"
import { Input } from "@feedgot/ui/components/input"
import { Textarea } from "@feedgot/ui/components/textarea"
import { client } from "@feedgot/api/client"
import { authClient } from "@feedgot/auth/client"
import { toast } from "sonner"
import { getBrowserFingerprint } from "@/utils/fingerprint"
import { Avatar, AvatarImage, AvatarFallback } from "@feedgot/ui/components/avatar"
import { getInitials } from "@/utils/user-utils"
import { LoaderIcon } from "@feedgot/ui/icons/loader"
import { XMarkIcon } from "@feedgot/ui/icons/xmark"
import { ChevronRight, ChevronsUpDown, ImageIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverList,
  PopoverListItem,
} from "@feedgot/ui/components/popover"
import { cn } from "@feedgot/ui/lib/utils"

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
  const [isPending, startTransition] = useTransition()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [user, setUser] = useState<{ name?: string; image?: string | null } | null>(null)
  
  const [boards, setBoards] = useState<any[]>([])
  const [selectedBoard, setSelectedBoard] = useState<{ name: string; slug: string } | null>(null)
  const [boardsOpen, setBoardsOpen] = useState(false)

  // Fetch user session
  useEffect(() => {
    if (open) {
      authClient.getSession().then((res) => {
        if (res.data?.user) {
          setUser(res.data.user)
        }
      })
    }
  }, [open])

  // Fetch boards
  useEffect(() => {
    if (open) {
      client.board.byWorkspaceSlug.$get({ slug: workspaceSlug }).then(async (res) => {
        if (res.ok) {
          const data = await res.json()
          const filteredBoards = data.boards.filter((b: any) => 
            !['roadmap', 'changelog'].includes(b.slug)
          )
          setBoards(filteredBoards)
          
          // Set initial selected board based on prop
          const current = filteredBoards.find((b: any) => b.slug === boardSlug)
          if (current) {
            setSelectedBoard(current)
          } else if (filteredBoards.length > 0) {
            setSelectedBoard(filteredBoards[0])
          }
        }
      })
    }
  }, [open, workspaceSlug, boardSlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content || !selectedBoard) return

    const fingerprint = await getBrowserFingerprint()

    startTransition(async () => {
      try {
        const res = await client.post.create.$post({
          title,
          content,
          workspaceSlug,
          boardSlug: selectedBoard.slug,
          fingerprint: user ? undefined : fingerprint,
        })

        if (res.ok) {
          toast.success("Post submitted successfully")
          onOpenChange(false)
          setTitle("")
          setContent("")
          // Refresh the page to show the new post
          window.location.reload()
        } else {
          const err = await res.json()
          if (res.status === 401) {
             toast.error("Anonymous posting is not allowed on this board")
          } else {
             toast.error((err as any)?.message || "Failed to submit post")
          }
        }
      } catch (error) {
        console.error("Failed to create post:", error)
        toast.error("Failed to submit post")
      }
    })
  }

  const initials = user?.name ? getInitials(user.name) : "?"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden border-none shadow-2xl top-[20%] translate-y-[-20%]">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
            
            {/* Header Area */}
            <div className="flex items-center gap-2 p-3 md:p-4 pb-1">
                {/* User Avatar */}
                <Avatar className="size-6">
                    {user?.image ? (
                        <AvatarImage src={user.image} alt={user.name} />
                    ) : (
                        <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
                    )}
                </Avatar>

                <ChevronRight className="size-4 text-muted-foreground" />

                {/* Board Selector */}
                <Popover open={boardsOpen} onOpenChange={setBoardsOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 gap-1 px-2 font-medium text-foreground hover:bg-muted"
                    >
                        {selectedBoard ? selectedBoard.name : "Select Board"}
                        <ChevronsUpDown className="size-3.5 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit  p-0" align="start" list>
                    <PopoverList>
                        {boards.map((b) => (
                            <PopoverListItem 
                                key={b.id} 
                                onClick={() => {
                                    setSelectedBoard(b)
                                    setBoardsOpen(false)
                                }}
                                className={cn(selectedBoard?.slug === b.slug && "bg-muted")}
                            >
                                <span className="font-medium text-sm">{b.name}</span>
                            </PopoverListItem>
                        ))}
                    </PopoverList>
                  </PopoverContent>
                </Popover>

                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-6 w-6 rounded-sm text-muted-foreground hover:text-foreground"
                    onClick={() => onOpenChange(false)}
                >
                    <XMarkIcon size={12} />
                </Button>
            </div>

            {/* Content Area */}
            <div className="px-3 md:px-4 flex flex-col">
                <Input
                    variant="plain"
                    placeholder="Submission title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={128}
                    className="text-lg md:text-xl font-semibold h-auto py-2"
                />
                <Textarea
                    variant="plain"
                    placeholder="Add details"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="resize-none min-h-[80px] py-2 text-base"
                    required
                />
            </div>

            {/* Footer Area */}
            <div className="flex items-center justify-between p-3 md:p-4 bg-muted">
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-foreground rounded-full hover:bg-background"
                    onClick={() => toast.info("Image upload coming soon!")}
                >
                    <ImageIcon className="size-5" />
                </Button>

                <Button 
                    type="submit" 
                    variant="quiet"
                    disabled={!title || !content || !selectedBoard || isPending}
                    className=" text-primary-foreground px-6"
                >
                    {isPending && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
                    {isPending ? "Creating..." : "Create"}
                </Button>
            </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
