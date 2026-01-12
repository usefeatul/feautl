"use client";

import React from "react";
import SectionCard from "../global/SectionCard";
import WorkspaceIdSection from "./WorkspaceIdSection";
import DangerZoneSection from "./DangerZoneSection";

type Props = {
    slug: string;
    workspaceId?: string;
    workspaceName?: string;
};

export default function WorkspaceSection({ slug, workspaceId, workspaceName }: Props) {
    return (
        <SectionCard title="Workspace" description="Manage your workspace settings.">
            <div className="space-y-10">
                <WorkspaceIdSection workspaceId={workspaceId} />
                <DangerZoneSection slug={slug} workspaceName={workspaceName} />
            </div>
        </SectionCard>
    );
}
