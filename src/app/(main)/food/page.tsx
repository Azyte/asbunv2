"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { formatRupiah } from "@/lib/fee";

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

  if (loading) return <div className="flex items-center justify-center pt-20"><p className="text-gray-400">Memuat...</p></div>;

  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold mb-4">Food Order</h1>
      <p className="text-sm text-gray-500 mb-4">Pilih merchant untuk pesan makanan</p>

      <div className="space-y-3">
        {merchants.length === 0 && <p className="text-sm text-gray-400 text-center py-10">Belum ada merchant. Jalankan seed data dulu.</p>}
        {merchants.map(m => (
          <Link key={m._id} href={`/food/${m._id}`}>
            <Card className="hover:shadow-md transition-shadow mb-3">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center text-2xl flex-shrink-0">
                  🍽️
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{m.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-500 truncate">{m.address}</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Zona {m.zone} · {m.distanceKm} km</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
