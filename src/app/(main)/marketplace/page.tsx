"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/fee";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Item {
  _id: string;
  name: string;
  price: number;
  description: string;
  condition: string;
  image?: string;
  status: string;
  sellerId: { name: string; room: string };
}

export default function MarketplacePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");

  function load(q = "") {
    fetch(`/api/marketplace${q ? `?q=${q}` : ""}`).then(r => r.json()).then(setItems);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Marketplace</h1>
        <Link href="/marketplace/sell">
          <Button size="sm">+ Jual</Button>
        </Link>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Cari barang..."
          className="pl-9"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && load(search)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.length === 0 && <p className="col-span-2 text-sm text-gray-400 text-center py-10">Belum ada barang dijual</p>}
        {items.map(item => (
          <Card key={item._id}>
            <div className="w-full aspect-square bg-gray-100 rounded-t-2xl flex items-center justify-center text-3xl">📦</div>
            <CardContent className="p-3">
              <h3 className="font-medium text-sm truncate">{item.name}</h3>
              <p className="text-xs text-green-600 font-semibold">{formatRupiah(item.price)}</p>
              <p className="text-[10px] text-gray-500 mt-1">{item.sellerId?.name} · {item.condition}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
