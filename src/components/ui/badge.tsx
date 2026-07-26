import { cn } from "@/lib/utils"

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-blue-100 text-blue-800",
  buying: "bg-purple-100 text-purple-800",
  delivering: "bg-orange-100 text-orange-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  available: "bg-green-100 text-green-800",
  borrowed: "bg-red-100 text-red-800",
  sold: "bg-gray-100 text-gray-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
}

const statusLabels: Record<string, string> = {
  pending: "Menunggu Jastiper",
  accepted: "Diterima",
  buying: "Sedang Dibeli",
  delivering: "Dalam Perjalanan",
  completed: "Selesai",
  cancelled: "Dibatalkan",
  available: "Tersedia",
  borrowed: "Dipinjam",
  sold: "Terjual",
  approved: "Disetujui",
  rejected: "Ditolak",
}

export function Badge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", statusColors[status] || "bg-gray-100 text-gray-800", className)}>
      {statusLabels[status] || status}
    </span>
  )
}
