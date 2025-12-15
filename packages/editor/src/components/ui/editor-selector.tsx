import { Button } from "@oreilla/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverList,
  PopoverListItem,
  PopoverTrigger,
} from "@oreilla/ui/components/popover";
import { cn } from "@oreilla/ui/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

export type EditorSelectorProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  children?: ReactNode;
};

/**
 * Editor Selector Component
 *
 * A popover-based selector that groups related editor buttons together.
 * Displays a button with a title and dropdown arrow that opens a popover
 * containing child components (typically editor node or mark buttons).
 * Designed to work within the bubble menu context.
 *
 * @example
 * ```tsx
 * <EditorSelector title="Text">
 *   <EditorNodeHeading1 />
 *   <EditorNodeHeading2 />
 *   <EditorNodeHeading3 />
 * </EditorSelector>
 * ```
 */
export const EditorSelector = ({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  title,
  className,
  children,
  ...props
}: EditorSelectorProps) => {
  const { editor } = useCurrentEditor();
  const [internalOpen, setInternalOpen] = useState(false);
  
  const open = controlledOpen ?? internalOpen;
  const onOpenChange = controlledOnOpenChange ?? setInternalOpen;

  if (!editor) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "flex items-center justify-center gap-1.5 h-8 px-2 rounded-md",
            open && "bg-primary/10 text-primary hover:bg-primary/20"
          )}
          size="sm"
          variant="ghost"
        >
          <span className="whitespace-nowrap text-xs font-medium">{title}</span>
          <ChevronDownIcon 
            className={cn(
              "shrink-0 transition-transform",
              open && "rotate-180"
            )}
            size={12} 
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn("w-56 p-1", className)}
        side="top"
        sideOffset={8}
        {...props}
      >
        <div className="flex flex-col gap-0.5">
          {Array.isArray(children)
            ? children.map((child, index) => (
                <div key={index} onClick={() => onOpenChange(false)}>
                  {child}
                </div>
              ))
            : children && (
                <div onClick={() => onOpenChange(false)}>
                  {children}
                </div>
              )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
