"use client";

import React from "react";
import SectionCard from "../global/SectionCard";
import DataImportSection from "./DataImportSection";
import DataExportSection from "./DataExportSection";


type Props = {
  slug: string;
};

export default function DataSection({ slug }: Props) {
  return (
    <SectionCard title="Data" description="Manage your workspace data.">
      <div className="space-y-10">
        <DataImportSection />
        <DataExportSection slug={slug} />
      </div>
    </SectionCard>
  );
}

