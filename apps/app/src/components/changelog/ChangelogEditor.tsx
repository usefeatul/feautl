"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { client } from "@featul/api/client";
import { toast } from "sonner";
import { FeedEditor, type FeedEditorRef } from "@/components/editor/editor";
import type { JSONContent } from "@featul/editor";
import TextareaAutosize from "react-textarea-autosize";
import { useEditorHeaderActions } from "./EditorHeaderContext";
import { CoverImageUploader } from "./CoverImageUploader";
import { InfoIcon } from "@featul/ui/icons/info";
import { TickIcon } from "@featul/ui/icons/tick";
import { LoaderIcon } from "@featul/ui/icons/loader";
import { ChevronLeftIcon } from "@featul/ui/icons/chevron-left";
import { TagSelector, type WorkspaceTag } from "./TagSelector";

interface ChangelogEditorProps {
    workspaceSlug: string;
    mode: "create" | "edit";
    entryId?: string;
    initialData?: {
        title: string;
        content: JSONContent;
        coverImage?: string | null;
        tags: string[];
        status: "draft" | "published" | "archived";
    };
    availableTags: WorkspaceTag[];
}

export function ChangelogEditor({
    workspaceSlug,
    mode,
    entryId,
    initialData,
    availableTags,
}: ChangelogEditorProps) {
    const router = useRouter();
    const editorRef = useRef<FeedEditorRef>(null);

    const [title, setTitle] = useState(initialData?.title || "");
    const [coverImage, setCoverImage] = useState<string | null>(initialData?.coverImage || null);
    const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || []);
    const [isDraft, setIsDraft] = useState(initialData?.status !== "published");
    const [isSaving, setIsSaving] = useState(false);
    const { setActions, clearActions } = useEditorHeaderActions();

    // Image upload handler for the editor (slash command, drag & drop, paste)
    const handleImageUpload = useCallback(async (file: File): Promise<string> => {
        const res = await client.storage.getUploadUrl.$post({
            slug: workspaceSlug,
            fileName: file.name,
            contentType: file.type,
            folder: "changelog/content",
        });
        const data = await res.json();

        if ("uploadUrl" in data && "publicUrl" in data) {
            await fetch(data.uploadUrl, {
                method: "PUT",
                body: file,
                headers: { "Content-Type": file.type },
            });
            return data.publicUrl;
        }
        throw new Error("Failed to upload image");
    }, [workspaceSlug]);

    const handleSave = useCallback(async () => {
        const content = editorRef.current?.getContent();

        if (!title.trim()) {
            toast.error("Please enter a title");
            return;
        }

        if (!content || !content.content?.length) {
            toast.error("Please add some content");
            return;
        }

        setIsSaving(true);
        try {
            if (mode === "create") {
                const res = await client.changelog.entriesCreate.$post({
                    slug: workspaceSlug,
                    title: title.trim(),
                    content: content as { type: string; content?: unknown[] },
                    coverImage: coverImage || undefined,
                    tags: selectedTags,
                    status: isDraft ? "draft" : "published",
                });
                const data = await res.json();
                if ("ok" in data && data.ok) {
                    toast.success(isDraft ? "Draft saved" : "Entry published");
                    setIsDirty(false);
                    router.replace(`/workspaces/${workspaceSlug}/changelog/${data.entry.id}/edit`);
                } else {
                    toast.error("Failed to create entry");
                }
            } else if (entryId) {
                const res = await client.changelog.entriesUpdate.$post({
                    slug: workspaceSlug,
                    entryId,
                    title: title.trim(),
                    content: content as { type: string; content?: unknown[] },
                    coverImage: coverImage,
                    tags: selectedTags,
                    status: isDraft ? "draft" : "published",
                });
                const data = await res.json();
                if ("ok" in data && data.ok) {
                    toast.success("Changes saved");
                    setIsDirty(false);
                    // router.push(`/workspaces/${workspaceSlug}/changelog`);
                } else {
                    toast.error("Failed to update entry");
                }
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    }, [mode, workspaceSlug, entryId, title, coverImage, selectedTags, isDraft, router]);

    const [isDirty, setIsDirty] = useState(false);

    // Auto-save effect
    useEffect(() => {
        if (isDirty && !isSaving) {
            const timer = setTimeout(() => {
                handleSave();
            }, 2000); // Auto-save after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [isDirty, isSaving, handleSave]);

    // Reset isDirty after successful save (handled in handleSave via isSaving check logic ideally, 
    // but handleSave toggles isSaving. We need to know when save finishes.)
    // Actually, handleSave sets isSaving(true) then (false). 
    // We can clear isDirty in handleSave *after* success.

    // Register actions with the header context
    useEffect(() => {
        setActions([
            {
                key: "status",
                label: "Published", // Label for Switch
                type: "switch",
                checked: !isDraft,
                onClick: () => setIsDraft(!isDraft),
            },
            {
                key: "save",
                label: "Save",
                type: "button",
                variant: "changelog",
                // Show InfoIcon if dirty (unsaved), TickIcon if clean (saved), Loader if saving
                icon: isSaving ? <LoaderIcon className="size-4 animate-spin" /> : isDirty ? <InfoIcon className="size-4" /> : <TickIcon className="size-4" />,
                onClick: handleSave,
                disabled: isSaving,
            },
            {
                key: "back",
                label: "",
                type: "button",
                variant: "changelog",
                icon: <ChevronLeftIcon className="size-3" />,
                onClick: () => router.push(`/workspaces/${workspaceSlug}/changelog`),
            },
        ]);

        return () => clearActions();
    }, [setActions, clearActions, handleSave, isSaving, isDraft, isDirty, router, workspaceSlug]);

    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto max-w-3xl px-4 pt-0 pb-8">
                {/* Cover Image (when present) */}
                {coverImage && (
                    <CoverImageUploader
                        workspaceSlug={workspaceSlug}
                        coverImage={coverImage}
                        onCoverImageChange={setCoverImage}
                    />
                )}

                {/* Tags and Add Cover Image Row */}
                <div className="mb-4 flex items-center gap-1 flex-wrap">
                    <TagSelector
                        availableTags={availableTags}
                        selectedTags={selectedTags}
                        onTagsChange={setSelectedTags}
                    />

                    {/* Add Cover Image Button (Always visible) */}
                    <CoverImageUploader
                        workspaceSlug={workspaceSlug}
                        coverImage={null}
                        onCoverImageChange={setCoverImage}
                    />
                </div>



                {/* Title */}
                <TextareaAutosize
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); setIsDirty(true); }}
                    placeholder="Enter a title"
                    className="w-full resize-none border-none bg-transparent text-3xl font-bold placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 mb-8 overflow-hidden"
                    minRows={1}
                    autoFocus={mode === "create"}
                />

                {/* Content Editor */}
                <div className="[&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none [&_.ProseMirror:focus]:outline-none [&_.ProseMirror:focus]:ring-0">
                    <FeedEditor
                        ref={editorRef}
                        initialContent={initialData?.content}
                        placeholder="Start typing or press '/' for commands"
                        className="min-h-[400px]"
                        onImageUpload={handleImageUpload}
                        onUpdate={() => setIsDirty(true)}
                    />
                </div>
            </main>
        </div>
    );
}

export default ChangelogEditor;
