"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/fee";

interface Request {
  _id: string;
  userId: { name: string; room: string };
  merchantId: { name: string; address: string; zone: string };
  items: { name: string; quantity: number }[];
  fee: number;
}

export default function RequestBoardPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    fetch("/api/orders?status=pending")
      .then(r => r.json())
      .then(setRequests);
  }, []);

  async function handleAccept(id: string) {
    const res = await fetch("/api/orders/accept", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: id })
    });
    if (res.ok) {
      setRequests(prev => prev.filter(r => r._id !== id));
      alert("Request diterima! Silakan belanja pesanan.");
    } else {
      alert("Gagal menerima request. Mungkin sudah diambil orang lain.");
    }
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold mb-4">Request Board</h1>
      <p className="text-sm text-gray-500 mb-4">Ambil request dan dapatkan uang saku!</p>

      <div className="space-y-3">
        {requests.length === 0 && <p className="text-sm text-gray-400 text-center py-10">Belum ada request baru</p>}
        {requests.map(r => (
          <Card key={r._id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-sm">{r.merchantId?.name}</h3>
                  <p className="text-xs text-gray-500">{r.userId?.name} · Kamar {r.userId?.room}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Fee</p>
                  <p className="font-semibold text-green-600">{formatRupiah(r.fee)}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 mb-3">
                {r.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
              </div>
              {session?.user && (session.user as any).id !== r.userId?._id && (
                <Button className="w-full" size="sm" onClick={() => handleAccept(r._id)}>Terima Request</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
