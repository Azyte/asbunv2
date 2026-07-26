import { cn } from "@/lib/utils"

const statusColors: Record<string, string> = {
  pending: "bg-yellow-900/40 border border-yellow-700/50 text-yellow-300",
  accepted: "bg-blue-900/40 border border-blue-700/50 text-blue-300",
  buying: "bg-purple-900/40 border border-purple-700/50 text-purple-300",
  delivering: "bg-orange-900/40 border border-orange-700/50 text-orange-300",
  completed: "bg-emerald-900/40 border border-emerald-700/50 text-emerald-300",
  cancelled: "bg-red-900/40 border border-red-700/50 text-red-300",
  available: "bg-emerald-900/40 border border-emerald-700/50 text-emerald-300",
  borrowed: "bg-red-900/40 border border-red-700/50 text-red-300",
  sold: "bg-slate-700/30 border border-slate-600/50 text-slate-300",
  approved: "bg-emerald-900/40 border border-emerald-700/50 text-emerald-300",
  rejected: "bg-red-900/40 border border-red-700/50 text-red-300",
}

const statusLabels: Record<string, string> = {
  pending: "Menunggu",
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
    <span className={cn("inline-flex items-center rounded-lg px-2 py-0.5 text-[10px] font-bold border", statusColors[status] || "bg-slate-800 text-slate-400 border-slate-700", className)}>
      {statusLabels[status] || status}
    </span>
  )
}
