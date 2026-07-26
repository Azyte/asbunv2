"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/fee";
import { Badge } from "@/components/ui/badge";

interface Request {
  _id: string;
  userId: { _id?: string; name: string; room: string };
  merchantId: { name: string; address: string; zone: string };
  items: { name: string; quantity: number }[];
  fee: number;
  status: string;
}

export default function RequestBoardPage() {
  const { data: session, status } = useSession();
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState("");

  function load() {
    fetch("/api/orders?status=pending").then(r => r.json()).then(setRequests);
  }

  useEffect(() => { load(); }, []);

  async function handleAccept(id: string) {
    setError("");
    const res = await fetch("/api/orders/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: id })
    });
    const data = await res.json().catch(() => null);
    if (res.ok) {
      setRequests(prev => prev.filter(r => r._id !== id));
      location.href = `/orders/${data._id}`;
    } else {
      setError(data?.error || "Gagal menerima request. Coba login ulang.");
    }
  }

  return (
    <div className="px-5 pt-6 pb-24">
      <h1 className="text-2xl font-black mb-1">Request Board</h1>
      <p className="text-sm text-slate-500 mb-5">Ambil request, pantau status, lalu selesaikan pesanan.</p>

      {status === "unauthenticated" && (
        <Link href="/login" className="mb-4 block rounded-3xl bg-slate-900 p-4 text-center text-sm font-bold text-white">Login dulu buat ambil jastip</Link>
      )}
      {error && <p className="mb-4 rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-600">{error}</p>}

      <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
        {requests.length === 0 && <p className="text-sm text-slate-400 text-center py-10 lg:col-span-2">Belum ada request baru</p>}
        {requests.map(r => (
          <Card key={r._id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-black text-slate-900">{r.merchantId?.name}</h3>
                  <p className="text-xs text-slate-500">Order ID: {r._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-slate-500">{r.userId?.name} · Kamar {r.userId?.room}</p>
                </div>
                <Badge status={r.status || "pending"} />
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl text-xs text-slate-600 mb-3">
                {r.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
              </div>
              <div className="flex items-center justify-between gap-3">
                <div><p className="text-xs text-slate-500">Fee Jastiper</p><p className="font-black text-emerald-600">{formatRupiah(r.fee)}</p></div>
                <Button size="sm" disabled={status !== "authenticated"} onClick={() => handleAccept(r._id)}>Accept</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
