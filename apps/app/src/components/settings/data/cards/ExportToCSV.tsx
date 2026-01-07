import React from "react";
import ImportCard from "./ImportCard";
import { Download } from "lucide-react";

type Props = {
  onExport?: () => void;
};

export default function ExportToCSV({ onExport }: Props) {
  return (
    <ImportCard
      icon={<Download className="w-5 h-5" />}
      title="Export to CSV"
      description="Export all your feedback submissions and their details to a downloadable CSV file."
      buttonLabel="Export"
      onAction={onExport}
    />
  );
}
