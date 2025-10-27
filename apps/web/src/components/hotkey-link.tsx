"use client";

import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { Button } from "@feedgot/ui/components/button";

type HotkeyLinkProps = {
  href: string;
  hotkeyHref: string;
  hotkey?: string;
  className?: string;
  children: React.ReactNode;
};

export function HotkeyLink({
  href,
  hotkeyHref,
  hotkey = "A",
  className,
  children,
}: HotkeyLinkProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      const key = e.key?.toLowerCase();
      if (key === hotkey.toLowerCase()) {
        e.preventDefault();
        // Navigate to the dashboard when the hotkey is pressed while focused on the link
        window.location.assign(hotkeyHref);
      }
    },
    [hotkey, hotkeyHref]
  );

  // Global hotkey while component is mounted (with accessibility guards)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      const isTyping =
        target?.isContentEditable ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT";
      if (isTyping) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key?.toLowerCase() === hotkey.toLowerCase()) {
        e.preventDefault();
        window.location.assign(hotkeyHref);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [hotkey, hotkeyHref]);

  return (
    <Button asChild variant="default" size="lg" className={className}>
      <Link
        href={href}
        onKeyDown={handleKeyDown}
        aria-keyshortcuts={hotkey.toUpperCase()}
      >
        {children}
        <span className="sr-only">
          Press {hotkey.toUpperCase()} to open dashboard
        </span>
        <kbd
          aria-hidden
          className=" rounded-sm bg-white/20 px-2 py-0.5 text-xs leading-4"
        >
          {hotkey.toUpperCase()}
        </kbd>
      </Link>
    </Button>
  );
}
