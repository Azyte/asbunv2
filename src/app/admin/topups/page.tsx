"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/fee";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminTopups() {
  const [topups, setTopups] = useState<any[]>([]);

  function load() { fetch("/api/admin/topups").then(r => r.json()).then(setTopups); }
  useEffect(() => { load(); }, []);

  async function action(id: string, status: string) {
    await fetch("/api/admin/topups", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    load();
  }

  return (
    <div className="px-5 pt-5 pb-28">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1 text-sm text-slate-500 mb-4"><ArrowLeft size={16} /> Kembali</Link>
      <h1 className="text-2xl font-black mb-1">Approval Topup</h1>
      <p className="text-sm text-slate-500 mb-5">Approve topup user agar saldo masuk otomatis.</p>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {topups.length === 0 && <p className="text-sm text-slate-500">Belum ada request topup</p>}
        {topups.map(t => (
          <Card key={t._id}>
            <CardContent className="p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div><p className="font-black">{t.userId?.name}</p><p className="text-xs text-slate-500">{t.userId?.email} · {t.userId?.room}</p></div>
                <Badge status={t.status} />
              </div>
              <p className="text-2xl font-black text-emerald-600 mb-1">{formatRupiah(t.amount)}</p>
              <p className="text-sm font-bold text-slate-700">{t.method}</p>
              {t.proof && <p className="mt-2 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600 break-all">{t.proof}</p>}
              {t.status === 'pending' && <div className="mt-4 grid grid-cols-2 gap-2"><Button size="sm" onClick={() => action(t._id, 'approved')}>Approve</Button><Button size="sm" variant="destructive" onClick={() => action(t._id, 'rejected')}>Reject</Button></div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
