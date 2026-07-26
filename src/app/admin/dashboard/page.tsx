"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/fee";
import Link from "next/link";
import { Banknote, Store, Users, Receipt, Package, WalletCards } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => { fetch("/api/admin/stats").then(r => r.json()).then(setStats); }, []);
  if (!stats) return <div className="p-5">Loading...</div>;

  const cards = [
    { label: "Total User", value: stats.userCount, icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Total Order", value: stats.orderCount, icon: Receipt, color: "from-emerald-500 to-teal-500" },
    { label: "Item Market", value: stats.marketCount, icon: Store, color: "from-violet-500 to-purple-500" },
    { label: "Barang Pinjam", value: stats.borrowCount, icon: Package, color: "from-orange-500 to-amber-500" },
  ];

  const links = [
    { href: "/admin/topups", label: "Approval Topup Saldo", icon: WalletCards },
    { href: "/admin/withdrawals", label: "Approval Withdraw", icon: Banknote },
    { href: "/admin/merchants", label: "Kelola Merchant & Menu", icon: Store },
    { href: "/admin/users", label: "Kelola Users", icon: Users },
    { href: "/admin/transactions", label: "Kelola Transaksi Order", icon: Receipt },
  ];

  return (
    <div className="px-5 pt-6 pb-28">
      <div className="mb-6"><p className="text-sm font-bold text-emerald-600">ASBUN Admin</p><h1 className="text-3xl font-black tracking-tight">Dashboard</h1></div>

      <div className="grid grid-cols-2 gap-3 mb-6 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="overflow-hidden">
            <CardContent className="p-4">
              <div className={`mb-4 h-11 w-11 rounded-2xl bg-gradient-to-br ${color} text-white flex items-center justify-center shadow-lg`}><Icon size={20} /></div>
              <p className="text-xs font-bold text-slate-500">{label}</p>
              <p className="text-2xl font-black text-slate-900">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6 border-0 bg-gradient-to-br from-slate-900 to-emerald-900 text-white">
        <CardContent className="p-5"><p className="text-xs text-emerald-100">Revenue Platform Fee</p><p className="text-3xl font-black">{formatRupiah(stats.revenue)}</p></CardContent>
      </Card>

      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-3xl border border-white/70 bg-white p-4 font-bold shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700"><Icon size={18} /></div>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
