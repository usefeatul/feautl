export const STATUSES = ["pending", "review", "planned", "progress", "completed", "closed"] as const;

export type StatusKey = (typeof STATUSES)[number];

export function normalizeStatus(s: string): StatusKey {
  const raw = (s || "pending").trim().toLowerCase().replace(/[\s-]+/g, "");
  const map: Record<string, StatusKey> = {
    pending: "pending",
    review: "review",
    planned: "planned",
    progress: "progress",
    completed: "completed",
    closed: "closed",
  };
  return map[raw] || "pending";
}