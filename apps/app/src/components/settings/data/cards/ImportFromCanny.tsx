import React from "react";
import ImportCard from "./ImportCard";
import { RefreshCw } from "lucide-react";

type Props = {
  onImport?: () => void;
};

export default function ImportFromCanny({ onImport }: Props) {
  return (
    <ImportCard
      icon={<RefreshCw className="w-5 h-5" />}
      title="Import from Canny"
      description="Import your feedback, feature requests, and comments directly from Canny."
      buttonLabel="Import"
      onAction={onImport}
    />
  );
}
