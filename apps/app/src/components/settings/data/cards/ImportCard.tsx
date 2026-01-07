import React from "react";
import { Button } from "@featul/ui/components/button";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonLabel?: string;
  buttonVariant?: "default" | "outline";
  onAction?: () => void;
  disabled?: boolean;
};

export default function ImportCard({
  icon,
  title,
  description,
  buttonLabel = "Import",
  buttonVariant = "outline",
  onAction,
  disabled = false,
}: Props) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-5 h-5 text-muted-foreground mt-0.5">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div>
        <Button
          variant={buttonVariant}
          size="sm"
          onClick={onAction}
          disabled={disabled}
          className="h-8 px-4 text-xs font-medium border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-950"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
