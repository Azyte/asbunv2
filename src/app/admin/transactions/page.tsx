"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/fee";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminTransactions() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => { fetch("/api/admin/orders").then(r => r.json()).then(setOrders); }, []);

  return (
    <div className="px-4 pt-4">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 mb-4"><ArrowLeft size={16} /> Kembali</Link>
      <h1 className="text-xl font-bold mb-4">Kelola Transaksi</h1>
      <div className="space-y-3">
        {orders.map(o => (
          <Card key={o._id}><CardContent className="p-4 flex justify-between">
            <div><p className="font-medium text-sm">{o.userId?.name} → {o.merchantId?.name}</p><p className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString('id-ID')}</p></div>
            <div className="text-right"><p className="font-semibold text-sm text-green-600">{formatRupiah(o.totalPrice)}</p><Badge status={o.status} className="mt-1" /></div>
          </CardContent></Card>
        ))}
      </div>
    </div>
  );
}
