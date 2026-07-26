"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, User, Wallet, ChevronRight, Star } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { formatRupiah } from "@/lib/fee";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (session?.user) fetch("/api/profile").then(r => r.json()).then(setProfile);
  }, [session, status, router]);

  if (!profile) return <div className="flex justify-center pt-20"><p>Memuat...</p></div>;

  return (
    <div className="px-5 pt-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-5 text-white shadow-2xl shadow-slate-900/20 mb-6">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-white/15 flex items-center justify-center backdrop-blur">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">{profile.name}</h1>
            <p className="text-sm text-slate-300">Kamar {profile.room}</p>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-yellow-400/20 px-2 py-1 text-xs font-bold text-yellow-200"><Star size={12} className="fill-yellow-300" /> {profile.rating?.toFixed(1)}</div>
          </div>
        </div>
      </div>

      <Link href="/wallet" className="block mb-6">
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-xl shadow-emerald-500/20">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-white/20 flex items-center justify-center"><Wallet size={22} /></div>
              <div><p className="text-xs text-emerald-50">Saldo Dompet</p><p className="text-xl font-extrabold">{formatRupiah(profile.balance)}</p></div>
            </div>
            <ChevronRight size={20} />
          </CardContent>
        </Card>
      </Link>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card><CardContent className="p-4 text-center"><p className="text-xs text-slate-500 mb-1">Pesanan</p><p className="text-2xl font-black text-slate-900">{profile.orderCount}</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xs text-slate-500 mb-1">Jastip</p><p className="text-2xl font-black text-emerald-600">{profile.jastipCount}</p></CardContent></Card>
      </div>

      <div className="space-y-3 mb-6">
        <Link href="/food/history" className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm border border-white/60">
          <span className="font-bold text-sm">Riwayat & Tracker Order</span><ChevronRight size={18} />
        </Link>
        <Link href="/wallet" className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm border border-white/60">
          <span className="font-bold text-sm">Wallet & Withdraw</span><ChevronRight size={18} />
        </Link>
        <Link href="/marketplace" className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm border border-white/60">
          <span className="font-bold text-sm">Data Marketplace</span><ChevronRight size={18} />
        </Link>
        <Link href="/borrow" className="flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm border border-white/60">
          <span className="font-bold text-sm">Data Borrow</span><ChevronRight size={18} />
        </Link>
        {(session?.user as any)?.role === 'admin' && (
          <Link href="/admin/dashboard" className="flex items-center justify-between rounded-3xl bg-slate-900 p-4 text-white shadow-sm">
            <span className="font-bold text-sm">Admin Dashboard</span><ChevronRight size={18} />
          </Link>
        )}
      </div>

      <Button variant="destructive" className="w-full flex items-center gap-2 rounded-2xl" onClick={() => signOut()}>
        <LogOut size={18} /> Keluar
      </Button>
    </div>
  );
}
