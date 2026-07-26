"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Utensils } from "lucide-react";

interface Merchant { _id: string; name: string; address: string; zone: string; distanceKm: number; menus: { name: string; price: number }[] }

export default function AdminMerchants() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [form, setForm] = useState({ name: "", address: "", zone: "A", distanceKm: "" });
  const [menu, setMenu] = useState<Record<string, { name: string; price: string }>>({});

  function load() { fetch("/api/merchants").then(r => r.json()).then(setMerchants); }
  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/merchants", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, distanceKm: parseFloat(form.distanceKm) }) });
    setForm({ name: "", address: "", zone: "A", distanceKm: "" });
    load();
  }

  async function addMenu(id: string) {
    const item = menu[id];
    if (!item?.name || !item?.price) return;
    await fetch("/api/admin/merchants", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, action: "add-menu", menu: { name: item.name, price: parseInt(item.price) } }) });
    setMenu({ ...menu, [id]: { name: "", price: "" } });
    load();
  }

  async function deleteMenu(id: string, name: string) {
    await fetch("/api/admin/merchants", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, action: "delete-menu", menu: { name } }) });
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus merchant?")) return;
    await fetch(`/api/admin/merchants?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="px-5 pt-5 pb-24">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1 text-sm text-slate-500 mb-4"><ArrowLeft size={16} /> Kembali</Link>
      <h1 className="text-2xl font-black mb-1">Food Admin</h1>
      <p className="text-sm text-slate-500 mb-5">Tambah tempat makan dan menu food order.</p>

      <Card className="mb-6"><CardContent className="p-4">
        <h3 className="font-black mb-3 text-sm flex items-center gap-2"><Utensils size={16} /> Tambah Tempat Makan</h3>
        <form onSubmit={handleAdd} className="space-y-3">
          <Input placeholder="Nama tempat makan" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <Input placeholder="Alamat" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
          <div className="grid grid-cols-2 gap-2">
            <select className="h-12 rounded-2xl border border-white/70 bg-white px-3 text-sm" value={form.zone} onChange={e => setForm({...form, zone: e.target.value})}>
              <option value="A">Zona A</option><option value="B">Zona B</option><option value="C">Zona C</option><option value="D">Zona D</option>
            </select>
            <Input type="number" step="0.1" placeholder="Jarak km" value={form.distanceKm} onChange={e => setForm({...form, distanceKm: e.target.value})} required />
          </div>
          <Button type="submit" className="w-full"><Plus size={16} /> Tambah Food Place</Button>
        </form>
      </CardContent></Card>

      <div className="space-y-4">
        {merchants.map(m => (
          <Card key={m._id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div><h3 className="font-black text-slate-900">{m.name}</h3><p className="text-xs text-slate-500">{m.address} · Zona {m.zone} · {m.distanceKm} km</p></div>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(m._id)}><Trash2 size={14} /></Button>
              </div>
              <div className="space-y-2 mb-3">
                {m.menus?.map(x => (
                  <div key={x.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-sm">
                    <span className="font-bold">{x.name}</span>
                    <div className="flex items-center gap-2"><span className="text-emerald-600 font-bold">Rp{x.price.toLocaleString("id-ID")}</span><button onClick={() => deleteMenu(m._id, x.name)} className="text-red-500"><Trash2 size={14} /></button></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-[1fr_90px_44px] gap-2">
                <Input placeholder="Nama menu" value={menu[m._id]?.name || ""} onChange={e => setMenu({ ...menu, [m._id]: { ...(menu[m._id] || { price: "" }), name: e.target.value } })} />
                <Input type="number" placeholder="Harga" value={menu[m._id]?.price || ""} onChange={e => setMenu({ ...menu, [m._id]: { ...(menu[m._id] || { name: "" }), price: e.target.value } })} />
                <Button size="icon" onClick={() => addMenu(m._id)}><Plus size={18} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
