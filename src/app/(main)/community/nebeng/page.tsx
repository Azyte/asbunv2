"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NebengPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/community/nebeng").then(r => r.json()).then(setItems);
  }, []);

  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold mb-4">Nebeng</h1>
      <p className="text-sm text-gray-500 mb-4">Cari tumpangan bareng teman asrama</p>
      
      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-gray-400 text-center py-10">Belum ada tawaran nebeng</p>}
        {items.map(item => (
          <Card key={item._id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-sm">{item.from} → {item.to}</h3>
                  <p className="text-xs text-gray-500">{new Date(item.datetime).toLocaleString('id-ID')}</p>
                </div>
                <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                  {item.seats} Kursi
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-3">Oleh: {item.userId?.name} (Kamar {item.userId?.room})</p>
              <Button size="sm" className="w-full">Chat Driver</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
