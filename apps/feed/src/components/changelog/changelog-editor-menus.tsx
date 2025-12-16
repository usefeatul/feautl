"use client";

import {
  EditorBubbleMenu,
  EditorClearFormatting,
  EditorLinkSelector,
  EditorMarkBold,
  EditorMarkCode,
  EditorMarkHighlight,
  EditorMarkItalic,
  EditorMarkStrike,
  EditorMarkSubscript,
  EditorMarkSuperscript,
  EditorMarkTextColor,
  EditorMarkUnderline,
  EditorNodeBulletList,
  EditorNodeCode,
  EditorNodeHeading1,
  EditorNodeHeading2,
  EditorNodeHeading3,
  EditorNodeOrderedList,
  EditorNodeQuote,
  EditorNodeTaskList,
  EditorNodeText,
  EditorSelector,
  EditorTableMenus,
} from "@oreilla/editor";

/**
 * ChangelogEditorMenus
 *
 * Provides the editor menus (bubble menu, table menus) for the changelog editor.
 * Includes text formatting, marks, links, and more.
 */
export function ChangelogEditorMenus() {
  return (
    <>
      <EditorBubbleMenu>
        <EditorSelector title="Text">
          <EditorNodeText />
          <EditorNodeHeading1 />
          <EditorNodeHeading2 />
          <EditorNodeHeading3 />
          <EditorNodeBulletList />
          <EditorNodeOrderedList />
          <EditorNodeTaskList />
          <EditorNodeQuote />
          <EditorNodeCode />
        </EditorSelector>

        <EditorSelector title="Format">
          <EditorMarkBold />
          <EditorMarkItalic />
          <EditorMarkUnderline />
          <EditorMarkStrike />
          <EditorMarkCode />
          <EditorMarkSuperscript />
          <EditorMarkSubscript />
        </EditorSelector>

        <EditorMarkTextColor />
        <EditorMarkHighlight />

        <EditorLinkSelector />

        <EditorClearFormatting />
      </EditorBubbleMenu>

      <EditorTableMenus />
    </>
  );
}

export default ChangelogEditorMenus;

