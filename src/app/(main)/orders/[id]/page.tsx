"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRupiah } from "@/lib/fee";

const STEPS = [
  { key: "pending", label: "Menunggu Jastiper" },
  { key: "accepted", label: "Diterima" },
  { key: "buying", label: "Sedang Dibeli" },
  { key: "delivering", label: "Dalam Perjalanan" },
  { key: "completed", label: "Selesai" },
];

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  function load() { fetch(`/api/orders/${id}`).then(r => r.json()).then(setOrder); }
  useEffect(() => { load(); }, [id]);

  async function update(status: string) {
    await fetch(`/api/orders/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    load();
  }

  if (!order) return <div className="p-5">Loading...</div>;
  const index = Math.max(0, STEPS.findIndex(s => s.key === order.status));

  return (
    <div className="px-5 pt-5 pb-24">
      <Link href="/food/history" className="inline-flex items-center gap-1 text-sm text-slate-500 mb-4"><ArrowLeft size={16} /> Kembali</Link>
      <div className="mb-5"><p className="text-xs font-bold text-emerald-600">ORDER ID #{order._id.slice(-8).toUpperCase()}</p><h1 className="text-2xl font-black">Tracker Pesanan</h1></div>

      <Card className="mb-5"><CardContent className="p-4">
        <div className="flex justify-between mb-3"><div><h3 className="font-black">{order.merchantId?.name}</h3><p className="text-xs text-slate-500">User: {order.userId?.name} · Jastiper: {order.jastiperId?.name || "Belum ada"}</p></div><Badge status={order.status} /></div>
        <div className="space-y-1 text-sm">{order.items.map((x: any) => <div key={x.name} className="flex justify-between"><span>{x.quantity}x {x.name}</span><span>{formatRupiah(x.price * x.quantity)}</span></div>)}</div>
        <div className="mt-3 pt-3 border-t flex justify-between font-black"><span>Total</span><span className="text-emerald-600">{formatRupiah(order.totalPrice)}</span></div>
      </CardContent></Card>

      <Card className="mb-5"><CardContent className="p-4">
        <h2 className="font-black mb-4">Status Tracker</h2>
        <div className="space-y-4">
          {STEPS.map((s, i) => {
            const done = i <= index;
            return <div key={s.key} className="flex items-center gap-3"><div className={done ? "text-emerald-500" : "text-slate-300"}>{done ? <CheckCircle2 size={22} /> : <Circle size={22} />}</div><span className={done ? "font-bold text-slate-900" : "text-slate-400"}>{s.label}</span></div>;
          })}
        </div>
      </CardContent></Card>

      <Card><CardContent className="p-4">
        <h2 className="font-black mb-3">Update Status (Jastiper/Admin)</h2>
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" onClick={() => update("buying")}>Sedang Dibeli</Button>
          <Button size="sm" onClick={() => update("delivering")}>Dalam Perjalanan</Button>
          <Button size="sm" className="col-span-2" onClick={() => update("completed")}>Selesai</Button>
        </div>
      </CardContent></Card>
    </div>
  );
}
