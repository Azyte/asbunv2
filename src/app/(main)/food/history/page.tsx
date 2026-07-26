"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/fee";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Order {
  _id: string;
  merchantId: { name: string };
  items: { name: string; quantity: number; price: number }[];
  status: string;
  totalPrice: number;
  createdAt: string;
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => { fetch("/api/orders").then(r => r.json()).then(setOrders); }, []);

  return (
    <div className="px-5 pt-5">
      <Link href="/food" className="inline-flex items-center gap-1 text-sm text-slate-500 mb-4"><ArrowLeft size={16} /> Kembali</Link>
      <h1 className="text-2xl font-black mb-1">Riwayat Pesanan</h1>
      <p className="text-sm text-slate-500 mb-5">Semua order tersimpan dengan Order ID dan status tracker.</p>

      <div className="space-y-3">
        {orders.length === 0 && <p className="text-sm text-slate-400 text-center py-10">Belum ada pesanan</p>}
        {orders.map(o => (
          <Link key={o._id} href={`/orders/${o._id}`}>
            <Card className="mb-3 hover:-translate-y-0.5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div><h3 className="font-black text-sm">{o.merchantId?.name}</h3><p className="text-[11px] text-slate-400">ID: {o._id.slice(-8).toUpperCase()}</p></div>
                  <div className="flex items-center gap-2"><Badge status={o.status} /><ChevronRight size={16} className="text-slate-400" /></div>
                </div>
                <p className="text-xs text-slate-500">{o.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}</p>
                <div className="flex justify-between mt-3 pt-3 border-t text-sm"><span className="text-slate-500">{new Date(o.createdAt).toLocaleDateString("id-ID")}</span><span className="font-black text-emerald-600">{formatRupiah(o.totalPrice)}</span></div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
