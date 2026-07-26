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
    <div className="px-5 pt-6 pb-28">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-5 text-white shadow-xl mb-6">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur border border-white/30">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-xl font-black">{profile.name}</h1>
            <p className="text-sm text-emerald-100/80">Kamar {profile.room}</p>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-yellow-400/20 px-2 py-1 text-xs font-bold text-yellow-300 border border-yellow-400/30"><Star size={12} className="fill-yellow-300" /> {profile.rating?.toFixed(1)}</div>
          </div>
        </div>
      </div>

      <Link href="/wallet" className="block mb-6">
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="p-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur"><Wallet size={20} /></div>
                <div><p className="text-xs font-bold text-emerald-50/90 uppercase tracking-wider">Saldo Dompet</p><p className="text-2xl font-black">{formatRupiah(profile.balance)}</p></div>
              </div>
              <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur"><ChevronRight size={20} /></div>
            </div>
          </CardContent>
        </Card>
      </Link>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card><CardContent className="p-4 text-center"><p className="text-xs text-slate-500 mb-1 font-semibold">Pesanan</p><p className="text-2xl font-black text-slate-900">{profile.orderCount}</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-xs text-slate-500 mb-1 font-semibold">Jastip</p><p className="text-2xl font-black text-emerald-600">{profile.jastipCount}</p></CardContent></Card>
      </div>

      <div className="space-y-3 mb-6">
        <Link href="/food/history" className="block rounded-xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between"><span className="font-bold text-sm">Riwayat & Tracker Order</span><ChevronRight size={18} className="text-slate-400" /></div>
        </Link>
        <Link href="/wallet" className="block rounded-xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between"><span className="font-bold text-sm">Dompet & Withdraw</span><ChevronRight size={18} className="text-slate-400" /></div>
        </Link>
        <Link href="/marketplace" className="block rounded-xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between"><span className="font-bold text-sm">Data Marketplace</span><ChevronRight size={18} className="text-slate-400" /></div>
        </Link>
        <Link href="/borrow" className="block rounded-xl bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between"><span className="font-bold text-sm">Data Borrow</span><ChevronRight size={18} className="text-slate-400" /></div>
        </Link>
        {(session?.user as any)?.role === 'admin' && (
          <Link href="/admin/dashboard" className="block rounded-xl bg-slate-900 p-4 text-white shadow-sm hover:bg-slate-800">
            <div className="flex items-center justify-between"><span className="font-bold text-sm">Admin Dashboard</span><ChevronRight size={18} /></div>
          </Link>
        )}
      </div>

      <Button variant="destructive" className="w-full flex items-center justify-center gap-2 rounded-xl" onClick={() => signOut()}>
        <LogOut size={18} /> Keluar
      </Button>
    </div>
  );
}
