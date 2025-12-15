"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react"
import { Button } from "@oreilla/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@oreilla/ui/components/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@oreilla/ui/components/alert-dialog"
import { Badge } from "@oreilla/ui/components/badge"
import { toast } from "sonner"
import { client } from "@oreilla/api/client"

interface ChangelogEntry {
  id: string
  title: string
  slug: string
  summary?: string
  coverImage?: string
  tags?: string[]
  status: "draft" | "published" | "archived"
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

interface ChangelogListProps {
  entries: ChangelogEntry[]
  slug: string
}

export default function ChangelogList({ entries, slug }: ChangelogListProps) {
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return

    setIsDeleting(true)
    try {
      const response = await client.changelog.delete.$post({ id: deleteId })
      if (response.ok) {
        toast.success("Changelog deleted successfully")
        router.refresh()
      }
    } catch (error) {
      console.error("Error deleting changelog:", error)
      toast.error("Failed to delete changelog")
    } finally {
      setIsDeleting(false)
      setDeleteId(null)
    }
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed rounded-lg">
        <h3 className="text-lg font-medium mb-2">No changelog entries yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create your first changelog entry to share product updates
        </p>
        <Link href={`/workspaces/${slug}/changelog/new`}>
          <Button>Create Entry</Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="rounded-lg border bg-card p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-semibold truncate">{entry.title}</h2>
                  <Badge
                    variant={
                      entry.status === "published"
                        ? "default"
                        : entry.status === "draft"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {entry.status}
                  </Badge>
                </div>

                {entry.summary && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {entry.summary}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  {entry.publishedAt ? (
                    <time dateTime={entry.publishedAt}>
                      Published {formatDistanceToNow(new Date(entry.publishedAt), { addSuffix: true })}
                    </time>
                  ) : (
                    <time dateTime={entry.createdAt}>
                      Created {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
                    </time>
                  )}
                </div>

                {entry.tags && entry.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {entry.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs rounded-md bg-muted px-2 py-0.5 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="flex-shrink-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/workspaces/${slug}/changelog/${entry.id}`}>
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/workspaces/${slug}/changelog/${entry.id}/edit`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDeleteId(entry.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </article>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Changelog Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this changelog entry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}


