export type DomainInfo = {
  id: string
  host: string
  cnameName: string
  cnameTarget: string
  txtName: string
  txtValue: string
  status: "pending" | "verified" | "error"
} | null

export type DNSStatus = "pending" | "verified" | "error"

export function dnsStatusBadgeClass(status: DNSStatus) {
  if (status === "pending") return "text-orange-500"
  if (status === "verified") return "text-green-500"
  return "text-red-500"
}
