import type { Role } from "../../../types/team";

export function roleBadgeClass(role: Role, isOwner?: boolean) {
  if (isOwner) return "bg-primary text-white";
  if (role === "admin") return "bg-orange-500 text-white";
  if (role === "viewer") return "bg-green-500 text-white";
  return "bg-blue-500 text-white";
}