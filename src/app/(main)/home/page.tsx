"use client";

import { useSession } from "next-auth/react";
import { Search, Utensils, ShoppingBag, Store, Repeat, Users, Car, Bell, Sparkles } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SHORTCUTS = [
  { href: "/food", icon: Utensils, label: "Food", color: "from-emerald-400 to-teal-500" },
  { href: "/jastip/board", icon: ShoppingBag, label: "Jastip", color: "from-blue-400 to-cyan-500" },
  { href: "/marketplace", icon: Store, label: "Market", color: "from-violet-400 to-purple-500" },
  { href: "/borrow", icon: Repeat, label: "Borrow", color: "from-orange-400 to-amber-500" },
  { href: "/community/nebeng", icon: Car, label: "Nebeng", color: "from-pink-400 to-rose-500" },
  { href: "/community/cari-partner", icon: Users, label: "Partner", color: "from-sky-400 to-blue-500" },
];

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div className="px-5 pt-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm text-slate-500">Selamat datang,</p>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{session?.user?.name || "Penghuni"}</h1>
        </div>
        <div className="h-11 w-11 rounded-2xl bg-white shadow-lg shadow-slate-900/5 flex items-center justify-center text-slate-600">
          <Bell size={20} />
        </div>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Cari makanan, barang, merchant..." className="pl-11" />
      </div>

      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-5 text-white shadow-2xl shadow-emerald-500/25 mb-6">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-xl" />
        <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-white/10 blur-xl" />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
            <Sparkles size={13} /> ASBUN Pro
          </div>
          <h2 className="text-xl font-extrabold leading-tight">Titip, pinjam, jual beli, semua dalam satu aplikasi.</h2>
          <p className="mt-2 text-sm text-emerald-50">Platform internal penghuni asrama yang cepat dan aman.</p>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800">Menu Utama</h2>
        <span className="text-xs font-medium text-emerald-600">6 fitur</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {SHORTCUTS.map(({ href, icon: Icon, label, color }) => (
          <Link key={href} href={href}>
            <Card className="hover:-translate-y-1 hover:shadow-xl">
              <CardContent className="flex flex-col items-center gap-2 p-4">
                <div className={`rounded-2xl bg-gradient-to-br ${color} p-3 text-white shadow-lg`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-bold text-slate-700">{label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800">Aktivitas Terbaru</h2>
        <span className="text-xs text-slate-400">Live</span>
      </div>
      <div className="space-y-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-lg">🍔</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800">Request Food aktif</p>
              <p className="text-xs text-slate-500">Ambil jastip dan dapatkan fee jasa.</p>
            </div>
            <Link href="/jastip/board" className="text-xs font-bold text-emerald-600">Lihat</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
