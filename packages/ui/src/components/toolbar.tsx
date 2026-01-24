"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@featul/ui/lib/utils"

const toolbarVariants = cva(
    "flex items-stretch rounded-sm border bg-background/95 backdrop-blur transition-all duration-300 overflow-hidden",
    {
        variants: {
            variant: {
                default: "border-border ring-1 ring-border/60 ring-offset-1 ring-offset-white dark:ring-offset-black",
                plain: "border-border",
            },
            size: {
                default: "h-9",
                sm: "h-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Toolbar = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof toolbarVariants>
>(({ className, size, variant, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(toolbarVariants({ size, variant, className }))}
        {...props}
    />
))
Toolbar.displayName = "Toolbar"

const ToolbarSeparator = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("w-px bg-border shrink-0 z-10", className)}
        {...props}
    />
))
ToolbarSeparator.displayName = "ToolbarSeparator"

export { Toolbar, ToolbarSeparator }
