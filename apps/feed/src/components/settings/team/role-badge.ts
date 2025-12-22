import type { Role } from "../../../types/team";

export function roleBadgeClass(role: Role, isOwner?: boolean) {
  if (isOwner) return "bg-primary/20 text-primary";
  if (role === "admin") return "bg-orange-50 text-orange-500 dark:bg-orange-900 dark:text-orange-300";
  if (role === "viewer") return "bg-green-50 text-green-500 dark:bg-green-900 dark:text-green-300";
  return "bg-blue-50 text-blue-500 dark:bg-blue-900 dark:text-blue-300";
}
