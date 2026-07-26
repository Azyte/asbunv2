"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateTotal, formatRupiah } from "@/lib/fee";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface MenuItem { name: string; price: number; image?: string }
interface Merchant { _id: string; name: string; address: string; zone: string; distanceKm: number; menus: MenuItem[] }

export default function MerchantPage() {
  const { merchantId } = useParams();
  const router = useRouter();
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/merchants").then(r => r.json()).then(data => {
      const m = data.find((m: Merchant) => m._id === merchantId);
      setMerchant(m || null);
    });
  }, [merchantId]);

  if (!merchant) return <div className="flex items-center justify-center pt-20"><p className="text-gray-400">Memuat...</p></div>;

  const cartItems = merchant.menus.filter(m => (cart[m.name] || 0) > 0);
  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const foodTotal = merchant.menus.reduce((sum, m) => sum + m.price * (cart[m.name] || 0), 0);
  const pricing = calculateTotal(foodTotal, merchant.distanceKm, itemCount);

  function updateCart(name: string, delta: number) {
    setCart(prev => ({ ...prev, [name]: Math.max(0, (prev[name] || 0) + delta) }));
  }

  async function handleOrder() {
    setLoading(true);
    setError("");
    const items = cartItems.map(m => ({ name: m.name, price: m.price, quantity: cart[m.name] }));
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchantId: merchant._id,
        items,
        notes,
        foodTotal: pricing.foodTotal,
        fee: pricing.fee,
        platformFee: pricing.platformFee,
        totalPrice: pricing.totalPrice,
      })
    });
    const data = await res.json().catch(() => null);
    if (res.ok) router.push(`/orders/${data._id}`);
    else {
      setError(data?.error || "Gagal membuat order. Coba login ulang.");
      setLoading(false);
    }
  }

  return (
    <div className="px-4 pt-4 pb-4">
      <Link href="/food" className="inline-flex items-center gap-1 text-sm text-gray-500 mb-4">
        <ArrowLeft size={16} /> Kembali
      </Link>

      <h1 className="text-xl font-bold">{merchant.name}</h1>
      <p className="text-sm text-gray-500 mb-4">{merchant.address} · Zona {merchant.zone}</p>

      <div className="space-y-2 mb-6">
        {merchant.menus.map(m => (
          <Card key={m.name}>
            <CardContent className="flex items-center justify-between p-3">
              <div>
                <p className="font-medium text-sm">{m.name}</p>
                <p className="text-xs text-green-600">{formatRupiah(m.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateCart(m.name, -1)} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"><Minus size={14} /></button>
                <span className="w-6 text-center text-sm font-medium">{cart[m.name] || 0}</span>
                <button onClick={() => updateCart(m.name, 1)} className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center"><Plus size={14} /></button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {itemCount > 0 && (
        <div className="space-y-3">
          <Input placeholder="Catatan (opsional)..." value={notes} onChange={e => setNotes(e.target.value)} />

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 space-y-1 text-sm">
              <div className="flex justify-between"><span>Makanan</span><span>{formatRupiah(pricing.foodTotal)}</span></div>
              <div className="flex justify-between"><span>Fee Jastiper</span><span>{formatRupiah(pricing.fee)}</span></div>
              <div className="flex justify-between"><span>Platform Fee</span><span>{formatRupiah(pricing.platformFee)}</span></div>
              <div className="flex justify-between font-bold border-t pt-1 mt-1"><span>Total</span><span>{formatRupiah(pricing.totalPrice)}</span></div>
            </CardContent>
          </Card>

          {error && <p className="rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-600">{error}</p>}
          <Button className="w-full" size="lg" onClick={handleOrder} disabled={loading}>
            {loading ? "Memproses..." : "Titip Sekarang"}
          </Button>
        </div>
      )}
    </div>
  );
}
