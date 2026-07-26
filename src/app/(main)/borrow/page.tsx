"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface BorrowItem {
  _id: string;
  itemName: string;
  status: string;
  ownerId: { _id: string; name: string; room: string };
  borrowerId?: { _id: string; name: string };
}

export default function BorrowPage() {
  const { data: session } = useSession();
  const userId = (session?.user as any)?.id;
  const [items, setItems] = useState<BorrowItem[]>([]);
  const [newItem, setNewItem] = useState("");

  function load() {
    fetch("/api/borrow").then(r => r.json()).then(setItems);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd() {
    if (!newItem.trim()) return;
    await fetch("/api/borrow", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ itemName: newItem }) });
    setNewItem("");
    load();
  }

  async function handleAction(id: string, action: string) {
    await fetch(`/api/borrow/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }) });
    load();
  }

  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold mb-4">Pinjam Barang</h1>

      <div className="flex gap-2 mb-6">
        <Input placeholder="Tambah barang untuk dipinjamkan..." value={newItem} onChange={e => setNewItem(e.target.value)} />
        <Button onClick={handleAdd} size="sm">Tambah</Button>
      </div>

      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-gray-400 text-center py-10">Belum ada barang</p>}
        {items.map(item => (
          <Card key={item._id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-sm">{item.itemName}</h3>
                <p className="text-xs text-gray-500">{item.ownerId?.name} · Kamar {item.ownerId?.room}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge status={item.status} />
                {item.status === 'available' && item.ownerId?._id !== userId && (
                  <Button size="sm" variant="outline" onClick={() => handleAction(item._id, 'borrow')}>Pinjam</Button>
                )}
                {item.status === 'borrowed' && item.borrowerId?._id === userId && (
                  <Button size="sm" variant="outline" onClick={() => handleAction(item._id, 'return')}>Kembalikan</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
