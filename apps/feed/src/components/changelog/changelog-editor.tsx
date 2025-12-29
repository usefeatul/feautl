"use client";

import {
  EditorContext,
  type JSONContent,
  useMarbleEditor as usefeatulEditor,
} from "@featul/editor";
import { EditorContent as TiptapEditorContent } from "@tiptap/react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  type ForwardedRef,
} from "react";
import { ChangelogEditorMenus } from "./changelog-editor-menus";

export interface ChangelogEditorRef {
  focus: () => void;
  getContent: () => JSONContent | undefined;
  getHTML: () => string | undefined;
  getText: () => string | undefined;
}

export interface ChangelogEditorProps {
  initialContent?: JSONContent;
  placeholder?: string;
  className?: string;
  onUpdate?: (content: JSONContent) => void;
  editable?: boolean;
}

/**
 * ChangelogEditor
 *
 * Editor component for changelog entries.
 * Uses the featul editor with custom menus and configuration.
 */
export const ChangelogEditor = forwardRef<
  ChangelogEditorRef,
  ChangelogEditorProps
>(
  (
    {
      initialContent,
      placeholder = 'start typing or press "/" for command',
      className,
      onUpdate,
      editable = true,
    }: ChangelogEditorProps,
    ref: ForwardedRef<ChangelogEditorRef>
  ) => {
    const handleEditorUpdate = useCallback(
      ({ editor }: { editor: { getJSON: () => JSONContent } }) => {
        const json = editor.getJSON();
        onUpdate?.(json);
      },
      [onUpdate]
    );

    const editor = usefeatulEditor({
      content: initialContent || undefined,
      placeholder,
      editable,
      editorProps: {
        attributes: {
          class:
            "prose prose-neutral dark:prose-invert max-w-none focus:outline-none min-h-[200px]",
        },
      },
      onUpdate: handleEditorUpdate,
    });

    const editorContextValue = useMemo(() => ({ editor }), [editor]);

    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          editor?.chain().focus().run();
        },
        getContent: () => editor?.getJSON(),
        getHTML: () => editor?.getHTML(),
        getText: () => editor?.getText(),
      }),
      [editor]
    );

    if (!editor) {
      return null;
    }

    return (
      <EditorContext.Provider value={editorContextValue}>
        <div className={className}>
          <ChangelogEditorMenus />
          <TiptapEditorContent editor={editor as any} />
        </div>
      </EditorContext.Provider>
    );
  }
);

ChangelogEditor.displayName = "ChangelogEditor";

export default ChangelogEditor;

