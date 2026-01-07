"use client";

import React from "react";
import ExportToCSV from "./cards/ExportToCSV";
import { ExportDialog } from "./ExportDialog";

type Props = {
  slug: string;
};

export default function DataExportSection({ slug }: Props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      <ExportToCSV onExport={() => setDialogOpen(true)} />
      <ExportDialog
        slug={slug}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
