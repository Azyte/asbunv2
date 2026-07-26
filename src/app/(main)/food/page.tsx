"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Search, Star, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Merchant {
  _id: string;
  name: string;
  address: string;
  zone: string;
  distanceKm: number;
  image?: string;
  menus: { name: string; price: number }[];
}

export default function FoodPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/merchants")
      .then(r => r.json())
      .then(data => { setMerchants(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center pt-20"><p className="text-slate-400">Memuat...</p></div>;

  return (
    <div className="px-5 pt-6">
      <div className="mb-5">
        <p className="text-sm font-medium text-emerald-600">ASBUN Food</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Mau titip apa?</h1>
      </div>

      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Cari merchant atau menu..." className="pl-11" />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-2">
        {['Semua', 'Terpopuler', 'Terdekat', 'Promo'].map((c, i) => (
          <button key={c} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 shadow-sm'}`}>{c}</button>
        ))}
      </div>

      <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0 xl:grid-cols-3">
        {merchants.length === 0 && <p className="text-sm text-slate-400 text-center py-10 lg:col-span-3">Belum ada merchant. Jalankan seed data dulu.</p>}
        {merchants.map(m => (
          <Link key={m._id} href={`/food/${m._id}`}>
            <Card className="overflow-hidden hover:-translate-y-1 hover:shadow-xl mb-4">
              <div className="h-28 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_30%)]" />
                <div className="absolute bottom-3 left-4 h-16 w-16 rounded-3xl bg-white/90 shadow-xl flex items-center justify-center text-3xl">🍽️</div>
                <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-700 flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400" /> 4.8</div>
              </div>
              <CardContent className="p-4 pt-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-slate-900 truncate">{m.name}</h3>
                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                      <MapPin size={12} /> <span className="truncate">{m.address}</span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-600">Zona {m.zone}</div>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={12} /> 15-30 min</span>
                  <span>{m.distanceKm} km</span>
                  <span>{m.menus.length} menu</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
