"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/fee";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft, Wallet } from "lucide-react";
import { useSession } from "next-auth/react";

export default function WalletPage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [form, setForm] = useState({ amount: "", method: "Gopay", accountNumber: "", accountName: "" });
  const [loading, setLoading] = useState(false);

  function load() {
    fetch("/api/profile").then(r => r.json()).then(setProfile);
    fetch("/api/wallet/withdraw").then(r => r.json()).then(setHistory);
  }

  useEffect(() => { load(); }, []);

  async function handleWd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/wallet/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, amount: parseInt(form.amount) })
    });
    setLoading(false);
    if (res.ok) {
      alert("Permintaan penarikan berhasil dibuat");
      setForm({ ...form, amount: "" });
      load();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  }

  if (!profile) return <div className="p-4">Loading...</div>;

  return (
    <div className="px-4 pt-4 pb-20">
      <Link href="/profile" className="inline-flex items-center gap-1 text-sm text-gray-500 mb-4"><ArrowLeft size={16} /> Kembali</Link>
      
      <Card className="bg-green-600 text-white mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2"><Wallet size={20} /> <span className="text-sm font-medium">Saldo Dompet</span></div>
          <p className="text-3xl font-bold">{formatRupiah(profile.balance)}</p>
        </CardContent>
      </Card>

      <h2 className="font-bold mb-3">Tarik Saldo</h2>
      <form onSubmit={handleWd} className="space-y-3 mb-8">
        <Input type="number" placeholder="Nominal (Rp)" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required />
        <select className="flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm" value={form.method} onChange={e => setForm({...form, method: e.target.value})}>
          <option>Gopay</option><option>OVO</option><option>DANA</option><option>BCA</option><option>Mandiri</option>
        </select>
        <Input placeholder="Nomor Rekening / HP" value={form.accountNumber} onChange={e => setForm({...form, accountNumber: e.target.value})} required />
        <Input placeholder="Atas Nama" value={form.accountName} onChange={e => setForm({...form, accountName: e.target.value})} required />
        <Button type="submit" className="w-full" disabled={loading || !form.amount}>Tarik Dana</Button>
      </form>

      <h2 className="font-bold mb-3">Riwayat Penarikan</h2>
      <div className="space-y-3">
        {history.length === 0 && <p className="text-sm text-gray-500">Belum ada riwayat</p>}
        {history.map(h => (
          <Card key={h._id}>
            <CardContent className="p-4 flex justify-between">
              <div><p className="font-medium text-sm">{h.method} - {h.accountNumber}</p><p className="text-xs text-gray-500">{new Date(h.createdAt).toLocaleDateString('id-ID')}</p></div>
              <div className="text-right"><p className="font-semibold text-sm text-red-600">-{formatRupiah(h.amount)}</p><Badge status={h.status} className="mt-1" /></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
