"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/fee";
import { ArrowLeft } from "lucide-react";
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

  useEffect(() => {
    fetch("/api/orders").then(r => r.json()).then(setOrders);
  }, []);

  return (
    <div className="px-4 pt-4">
      <Link href="/food" className="inline-flex items-center gap-1 text-sm text-gray-500 mb-4">
        <ArrowLeft size={16} /> Kembali
      </Link>
      <h1 className="text-xl font-bold mb-4">Riwayat Pesanan</h1>

      <div className="space-y-3">
        {orders.length === 0 && <p className="text-sm text-gray-400 text-center py-10">Belum ada pesanan</p>}
        {orders.map(o => (
          <Card key={o._id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{o.merchantId?.name}</h3>
                <Badge status={o.status} />
              </div>
              <div className="text-xs text-gray-500 space-y-0.5">
                {o.items.map((i, idx) => (
                  <p key={idx}>{i.quantity}x {i.name}</p>
                ))}
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t text-sm">
                <span className="text-gray-500">{new Date(o.createdAt).toLocaleDateString('id-ID')}</span>
                <span className="font-semibold text-green-600">{formatRupiah(o.totalPrice)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
