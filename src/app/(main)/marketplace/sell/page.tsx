"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SellPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", price: "", description: "", condition: "Bekas - Layak Pakai" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/marketplace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: parseInt(form.price) })
    });
    if (res.ok) router.push("/marketplace");
    else setLoading(false);
  }

  return (
    <div className="px-4 pt-4">
      <Link href="/marketplace" className="inline-flex items-center gap-1 text-sm text-gray-500 mb-4">
        <ArrowLeft size={16} /> Kembali
      </Link>
      <h1 className="text-xl font-bold mb-4">Jual Barang</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="text-sm font-medium">Nama Barang</label><Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
        <div><label className="text-sm font-medium">Harga (Rp)</label><Input type="number" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
        <div><label className="text-sm font-medium">Deskripsi</label><Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
        <div>
          <label className="text-sm font-medium">Kondisi</label>
          <select className="flex h-10 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm" value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })}>
            <option>Baru</option>
            <option>Bekas - Seperti Baru</option>
            <option>Bekas - Layak Pakai</option>
          </select>
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Memproses..." : "Jual Barang"}
        </Button>
      </form>
    </div>
  );
}
