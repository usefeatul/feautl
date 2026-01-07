"use client";

import React from "react";
import SectionCard from "../global/SectionCard";
import DataImportSection from "./DataImportSection";
import DataExportSection from "./DataExportSection";
import WorkspaceIdSection from "./WorkspaceIdSection";
import DangerZoneSection from "./DangerZoneSection";

type Props = {
  slug: string;
  workspaceId?: string;
  workspaceName?: string;
};

export default function DataSection({ slug, workspaceId, workspaceName }: Props) {
  return (
    <SectionCard title="Data" description="Manage your workspace data.">
      <div className="space-y-10">
        <DataImportSection />
        <DataExportSection />
        <WorkspaceIdSection workspaceId={workspaceId} />
        <DangerZoneSection slug={slug} workspaceName={workspaceName} />
      </div>
    </SectionCard>
  );
}

