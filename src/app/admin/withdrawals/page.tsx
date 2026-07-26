"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/fee";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminWithdrawals() {
  const [reqs, setReqs] = useState<any[]>([]);

  function load() { fetch("/api/admin/withdrawals").then(r => r.json()).then(setReqs); }
  useEffect(() => { load(); }, []);

  async function handleAction(id: string, status: string) {
    await fetch("/api/admin/withdrawals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    });
    load();
  }

  return (
    <div className="px-4 pt-4">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 mb-4"><ArrowLeft size={16} /> Kembali</Link>
      <h1 className="text-xl font-bold mb-4">Persetujuan Penarikan</h1>
      <div className="space-y-3">
        {reqs.map(r => (
          <Card key={r._id}>
            <CardContent className="p-4">
              <div className="flex justify-between mb-2">
                <div><p className="font-bold">{r.userId?.name}</p><p className="text-xs text-gray-500">{r.method} - {r.accountNumber} ({r.accountName})</p></div>
                <div className="text-right font-bold text-green-600">{formatRupiah(r.amount)}</div>
              </div>
              <p className="text-xs mb-3">Status: {r.status}</p>
              {r.status === 'pending' && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleAction(r._id, 'approved')}>Setujui</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleAction(r._id, 'rejected')}>Tolak</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
