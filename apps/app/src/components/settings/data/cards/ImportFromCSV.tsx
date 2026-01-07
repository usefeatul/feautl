import React from "react";
import ImportCard from "./ImportCard";
import { Table } from "lucide-react";

type Props = {
  onImport?: () => void;
};

export default function ImportFromCSV({ onImport }: Props) {
  return (
    <ImportCard
      icon={<Table className="w-5 h-5" />}
      title="Import from CSV"
      description="Import your feature requests, boards, and users from a CSV file."
      buttonLabel="Import"
      onAction={onImport}
    />
  );
}
