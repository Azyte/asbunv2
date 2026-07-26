"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default function AdminMerchants() {
  const [merchants, setMerchants] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", address: "", zone: "A", distanceKm: "" });

  function load() { fetch("/api/merchants").then(r => r.json()).then(setMerchants); }
  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/merchants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, distanceKm: parseFloat(form.distanceKm), menus: [] })
    });
    setForm({ name: "", address: "", zone: "A", distanceKm: "" });
    load();
  }

  async function handleDelete(id: string) {
    if(!confirm('Hapus merchant?')) return;
    await fetch(`/api/admin/merchants?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="px-4 pt-4 pb-20">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 mb-4"><ArrowLeft size={16} /> Kembali</Link>
      <h1 className="text-xl font-bold mb-4">Kelola Merchant & Menu</h1>

      <Card className="mb-6"><CardContent className="p-4">
        <h3 className="font-bold mb-3 text-sm">Tambah Merchant</h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <Input placeholder="Nama Merchant" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <Input placeholder="Alamat" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
          <div className="flex gap-2">
            <select className="flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm" value={form.zone} onChange={e => setForm({...form, zone: e.target.value})}>
              <option value="A">Zona A (≤2km)</option><option value="B">Zona B (2-4km)</option><option value="C">Zona C (4-6km)</option><option value="D">Zona D (>6km)</option>
            </select>
            <Input type="number" step="0.1" placeholder="Jarak (km)" value={form.distanceKm} onChange={e => setForm({...form, distanceKm: e.target.value})} required />
          </div>
          <Button type="submit" size="sm" className="w-full">Tambah</Button>
        </form>
      </CardContent></Card>

      <div className="space-y-3">
        {merchants.map(m => (
          <Card key={m._id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div><h3 className="font-bold">{m.name}</h3><p className="text-xs text-gray-500">{m.address} - Zona {m.zone} ({m.distanceKm}km)</p></div>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(m._id)}>Hapus</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
