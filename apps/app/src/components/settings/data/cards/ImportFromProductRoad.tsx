import React from "react";
import ImportCard from "./ImportCard";
import { LayoutGrid } from "lucide-react";

type Props = {
  onImport?: () => void;
};

export default function ImportFromProductRoad({ onImport }: Props) {
  return (
    <ImportCard
      icon={<LayoutGrid className="w-5 h-5" />}
      title="Import from ProductRoad"
      description="Import your posts, boards, and comments directly from ProductRoad."
      buttonLabel="Import"
      onAction={onImport}
    />
  );
}
