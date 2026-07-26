"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CATEGORIES = ['Belajar', 'Gym', 'Badminton', 'Tennis', 'Jogging', 'Main Game'];
const CAT_ICONS: Record<string, string> = { Belajar: '📚', Gym: '💪', Badminton: '🏸', Tennis: '🎾', Jogging: '🏃', 'Main Game': '🎮' };

export default function CariPartnerPage() {
  const [items, setItems] = useState<any[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("/api/community/partner").then(r => r.json()).then(setItems);
  }, []);

  const filtered = filter ? items.filter(i => i.category === filter) : items;

  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold mb-4">Cari Partner</h1>

      <div className="flex gap-2 overflow-x-auto mb-4 pb-2">
        <button onClick={() => setFilter("")} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${!filter ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Semua</button>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${filter === c ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
            {CAT_ICONS[c]} {c}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && <p className="text-sm text-gray-400 text-center py-10">Belum ada yang cari partner</p>}
        {filtered.map(item => (
          <Card key={item._id}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl flex-shrink-0">
                {CAT_ICONS[item.category] || '🤝'}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{item.category}</h3>
                {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                <p className="text-xs text-gray-400 mt-1">{item.userId?.name} · {new Date(item.datetime).toLocaleString('id-ID')}</p>
              </div>
              <Button size="sm" variant="outline">Join</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
