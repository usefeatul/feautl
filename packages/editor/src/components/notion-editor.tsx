"use client";

import {
  forwardRef,
  useImperativeHandle,
  type ForwardedRef,
} from "react";
import type { JSONContent } from "@tiptap/react";
import { EditorContent as TiptapEditorContent } from "@tiptap/react";
import { EditorContext, useMarbleEditor } from "./editor-provider";
import { EditorBubbleMenu } from "./menus/bubble-menu";
import { EditorMarkBold } from "./marks/editor-mark-bold";
import { EditorMarkItalic } from "./marks/editor-mark-italic";
import { EditorMarkStrike } from "./marks/editor-mark-strike";
import { EditorMarkCode } from "./marks/editor-mark-code";
import { EditorLinkSelector } from "./marks/editor-link-selector";
import "../styles/editor.css";

export interface NotionEditorRef {
  focus: () => void;
  getContent: () => JSONContent | undefined;
  getHTML: () => string | undefined;
  getText: () => string | undefined;
}

export interface NotionEditorProps {
  initialContent?: JSONContent;
  placeholder?: string;
  className?: string;
  onUpdate?: (content: JSONContent) => void;
  editable?: boolean;
}

/**
 * NotionEditor Component
 * 
 * A Notion-style block editor with slash commands, bubble menu, and rich text formatting.
 * Compatible with the old editorold API for easy migration.
 * 
 * @example
 * ```tsx
 * const editorRef = useRef<NotionEditorRef>(null);
 * 
 * <NotionEditor 
 *   ref={editorRef}
 *   initialContent={content}
 *   placeholder="Start typing..."
 *   onUpdate={(content) => console.log(content)}
 * />
 * 
 * // Get content
 * const content = editorRef.current?.getContent();
 * ```
 */
export const NotionEditor = forwardRef<NotionEditorRef, NotionEditorProps>(
  function NotionEditor(
    { initialContent, placeholder = "Start typing...", className, onUpdate, editable = true },
    ref: ForwardedRef<NotionEditorRef>
  ) {
    const editor = useMarbleEditor({
      content: initialContent,
      placeholder,
      editable,
      onUpdate: ({ editor }) => {
        onUpdate?.(editor.getJSON());
      },
    });

    useImperativeHandle(ref, () => ({
      focus: () => {
        editor?.chain().focus().run();
      },
      getContent: () => {
        return editor?.getJSON();
      },
      getHTML: () => {
        return editor?.getHTML();
      },
      getText: () => {
        return editor?.getText();
      },
    }));

    if (!editor) {
      return null;
    }

    return (
      <EditorContext.Provider value={{ editor }}>
        <div className={`border-none outline-none ${className || ""}`}>
          <EditorBubbleMenu>
            <EditorMarkBold />
            <EditorMarkItalic />
            <EditorMarkStrike />
            <EditorMarkCode />
            <EditorLinkSelector />
          </EditorBubbleMenu>
          <TiptapEditorContent 
            editor={editor} 
            className="prose prose-neutral dark:prose-invert max-w-none focus:outline-none min-h-[200px]"
          />
        </div>
      </EditorContext.Provider>
    );
  }
);

export default NotionEditor;

