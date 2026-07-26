"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/fee";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Wallet, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

export default function WalletPage() {
  const [profile, setProfile] = useState<any>(null);
  const [withdraws, setWithdraws] = useState<any[]>([]);
  const [topups, setTopups] = useState<any[]>([]);
  const [tab, setTab] = useState<"topup" | "withdraw">("topup");
  const [wd, setWd] = useState({ amount: "", method: "Gopay", accountNumber: "", accountName: "" });
  const [tp, setTp] = useState({ amount: "", method: "QRIS", proof: "" });
  const [loading, setLoading] = useState(false);

  function load() {
    fetch("/api/profile").then(r => r.json()).then(setProfile);
    fetch("/api/wallet/withdraw").then(r => r.json()).then(setWithdraws);
    fetch("/api/wallet/topup").then(r => r.json()).then(setTopups);
  }

  useEffect(() => { load(); }, []);

  async function submitTopup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/wallet/topup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...tp, amount: parseInt(tp.amount) }) });
    setLoading(false);
    const data = await res.json().catch(() => null);
    if (!res.ok) return alert(data?.error || "Topup gagal");
    alert("Request topup dibuat. Tunggu admin approve.");
    setTp({ ...tp, amount: "", proof: "" });
    load();
  }

  async function submitWithdraw(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/wallet/withdraw", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...wd, amount: parseInt(wd.amount) }) });
    setLoading(false);
    const data = await res.json().catch(() => null);
    if (!res.ok) return alert(data?.error || "Withdraw gagal");
    alert("Request withdraw dibuat.");
    setWd({ ...wd, amount: "" });
    load();
  }

  if (!profile) return <div className="p-5">Loading...</div>;

  return (
    <div className="px-5 pt-5 pb-28">
      <Link href="/profile" className="inline-flex items-center gap-1 text-sm text-slate-500 mb-4"><ArrowLeft size={16} /> Kembali</Link>
      <div className="grid gap-5 lg:grid-cols-[380px_1fr]">
        <div>
          <Card className="mb-5 overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-800 text-white shadow-2xl shadow-emerald-900/20">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-2"><Wallet size={22} /><span className="text-sm font-bold text-emerald-100">Saldo Dompet</span></div>
              <p className="text-4xl font-black tracking-tight">{formatRupiah(profile.balance)}</p>
              <p className="mt-2 text-xs text-emerald-100">Saldo masuk setelah topup diapprove admin.</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-sm mb-5">
            <button onClick={() => setTab("topup")} className={`rounded-2xl px-4 py-3 text-sm font-black ${tab === "topup" ? "bg-emerald-500 text-white" : "text-slate-500"}`}><ArrowDownToLine size={16} className="inline mr-1" /> Topup</button>
            <button onClick={() => setTab("withdraw")} className={`rounded-2xl px-4 py-3 text-sm font-black ${tab === "withdraw" ? "bg-slate-900 text-white" : "text-slate-500"}`}><ArrowUpFromLine size={16} className="inline mr-1" /> Withdraw</button>
          </div>

          {tab === "topup" ? (
            <Card><CardContent className="p-4">
              <h2 className="font-black mb-3">Topup Saldo</h2>
              <form onSubmit={submitTopup} className="space-y-3">
                <Input type="number" placeholder="Nominal minimal 10000" value={tp.amount} onChange={e => setTp({...tp, amount: e.target.value})} required />
                <select className="h-12 w-full rounded-2xl border border-white/70 bg-white px-4 text-sm shadow-sm" value={tp.method} onChange={e => setTp({...tp, method: e.target.value})}>
                  <option>QRIS</option><option>Transfer BCA</option><option>Transfer Mandiri</option><option>DANA</option><option>Gopay</option><option>OVO</option>
                </select>
                <Input placeholder="Catatan / link bukti transfer" value={tp.proof} onChange={e => setTp({...tp, proof: e.target.value})} />
                <Button type="submit" className="w-full" disabled={loading}>Kirim Request Topup</Button>
              </form>
            </CardContent></Card>
          ) : (
            <Card><CardContent className="p-4">
              <h2 className="font-black mb-3">Tarik Saldo</h2>
              <form onSubmit={submitWithdraw} className="space-y-3">
                <Input type="number" placeholder="Nominal (Rp)" value={wd.amount} onChange={e => setWd({...wd, amount: e.target.value})} required />
                <select className="h-12 w-full rounded-2xl border border-white/70 bg-white px-4 text-sm shadow-sm" value={wd.method} onChange={e => setWd({...wd, method: e.target.value})}>
                  <option>Gopay</option><option>OVO</option><option>DANA</option><option>BCA</option><option>Mandiri</option>
                </select>
                <Input placeholder="Nomor Rekening / HP" value={wd.accountNumber} onChange={e => setWd({...wd, accountNumber: e.target.value})} required />
                <Input placeholder="Atas Nama" value={wd.accountName} onChange={e => setWd({...wd, accountName: e.target.value})} required />
                <Button type="submit" className="w-full" disabled={loading || !wd.amount}>Tarik Dana</Button>
              </form>
            </CardContent></Card>
          )}
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <History title="Riwayat Topup" items={topups} sign="+" color="text-emerald-600" />
          <History title="Riwayat Withdraw" items={withdraws} sign="-" color="text-red-600" />
        </div>
      </div>
    </div>
  );
}

function History({ title, items, sign, color }: { title: string; items: any[]; sign: string; color: string }) {
  return (
    <div>
      <h2 className="font-black mb-3">{title}</h2>
      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-slate-500">Belum ada riwayat</p>}
        {items.map(h => (
          <Card key={h._id}>
            <CardContent className="p-4 flex justify-between gap-3">
              <div><p className="font-bold text-sm">{h.method}</p><p className="text-xs text-slate-500">{new Date(h.createdAt).toLocaleDateString('id-ID')}</p></div>
              <div className="text-right"><p className={`font-black text-sm ${color}`}>{sign}{formatRupiah(h.amount)}</p><Badge status={h.status} className="mt-1" /></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
