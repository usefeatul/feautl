import type { Role } from "../../../types/team";

export function roleBadgeClass(role: Role, isOwner?: boolean) {
  if (isOwner) return "bg-primary/15 text-primary dark:bg-primary/25";
  if (role === "admin") return "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300";
  if (role === "viewer") return "bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-300";
  return "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300";
}
