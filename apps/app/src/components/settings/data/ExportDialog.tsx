"use client";

import React from "react";
import { SettingsDialogShell } from "../global/SettingsDialogShell";
import { Button } from "@featul/ui/components/button";
import { client } from "@featul/api/client";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";
import { FileExportIcon } from "@featul/ui/icons/file-export";

type Props = {
  slug: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type ExportState = "idle" | "exporting" | "ready" | "error";

export function ExportDialog({ slug, open, onOpenChange }: Props) {
  const [state, setState] = React.useState<ExportState>("idle");
  const [downloadUrl, setDownloadUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleExport = React.useCallback(async () => {
    setState("exporting");
    setError(null);
    toast.loading("Exporting your data...", { id: "export-csv" });

    try {
      // Run export and minimum delay in parallel
      const [res] = await Promise.all([
        client.workspace.exportCsv.$get({ slug }),
        new Promise((resolve) => setTimeout(resolve, 1500)), // Minimum 1.5s delay
      ]);
      
      if (!res.ok) {
        throw new Error("Failed to export data");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setState("ready");
      toast.success("Export ready!", { id: "export-csv" });
    } catch (err) {
      console.error("Export failed:", err);
      setError("Failed to export data. Please try again.");
      setState("error");
      toast.error("Export failed", { id: "export-csv" });
    }
  }, [slug]);

  const handleDownload = React.useCallback(() => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${slug}-export.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [downloadUrl, slug]);

  const handleClose = React.useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        // Reset state when closing
        setState("idle");
        setDownloadUrl(null);
        setError(null);
        if (downloadUrl) {
          URL.revokeObjectURL(downloadUrl);
        }
      }
      onOpenChange(newOpen);
    },
    [onOpenChange, downloadUrl]
  );

  // Auto-start export when dialog opens
  React.useEffect(() => {
    if (open && state === "idle") {
      handleExport();
    }
  }, [open, state, handleExport]);

  return (
    <SettingsDialogShell
      open={open}
      onOpenChange={handleClose}
      title="Export to CSV"
      icon={<FileExportIcon className="w-4 h-4" />}
    >
      <div className="p-4 space-y-4">
        {state === "exporting" && (
          <div className="flex flex-col items-center justify-center py-6 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-accent">Exporting your data...</p>
          </div>
        )}

        {state === "ready" && (
          <div className="flex flex-col items-center justify-center py-6 gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Download className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Export ready!</p>
              <p className="text-sm text-accent mt-1">
                Your CSV file is ready to download.
              </p>
            </div>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Download CSV
            </Button>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center justify-center py-6 gap-4">
            <p className="text-sm text-destructive">{error}</p>
            <Button variant="secondary" onClick={handleExport}>
              Try Again
            </Button>
          </div>
        )}
      </div>
    </SettingsDialogShell>
  );
}
