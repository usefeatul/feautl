"use client"

import React from "react"
import SectionCard from "../global/SectionCard"
import RoadmapVisibility from "./RoadmapVisibility"
import ManageTags from "./ManageTags"

export default function FeedbackSection({
  slug,
  plan,
  initialBoards,
  initialTags,
}: {
  slug: string
  plan?: string
  initialBoards?: any[]
  initialTags?: any[]
}) {
  return (
    <SectionCard title="Feedback" description="Configure boards and feedback">
        <RoadmapVisibility slug={slug} initialBoards={initialBoards} />
        <ManageTags slug={slug} plan={plan} initialTags={initialTags} />
    </SectionCard>
  )
}
