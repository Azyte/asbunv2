"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/lib/fee";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then(r => r.json()).then(setStats);
  }, []);

  if (!stats) return <div className="p-4">Loading...</div>;

  const cards = [
    { label: "Total User", value: stats.userCount, color: "text-blue-600" },
    { label: "Total Order", value: stats.orderCount, color: "text-green-600" },
    { label: "Item Market", value: stats.marketCount, color: "text-purple-600" },
    { label: "Barang Pinjam", value: stats.borrowCount, color: "text-orange-600" },
  ];

  return (
    <div className="px-4 pt-6">
      <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {cards.map(c => (
          <Card key={c.label}>
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">{c.label}</p>
              <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-3">
        <CardContent className="p-4">
          <p className="text-xs text-gray-500">Revenue (Platform Fee)</p>
          <p className="text-2xl font-bold text-green-600">{formatRupiah(stats.revenue)}</p>
        </CardContent>
      </Card>

      <div className="space-y-2 mt-6">
        <Link href="/admin/merchants" className="block bg-white border rounded-xl p-4 hover:bg-gray-50">Kelola Merchant & Menu →</Link>
        <Link href="/admin/withdrawals" className="block bg-white border rounded-xl p-4 hover:bg-gray-50">Persetujuan Penarikan Dana →</Link>
        <Link href="/admin/users" className="block bg-white border rounded-xl p-4 hover:bg-gray-50">Kelola Users →</Link>
        <Link href="/admin/transactions" className="block bg-white border rounded-xl p-4 hover:bg-gray-50">Kelola Transaksi Order →</Link>
      </div>
    </div>
  );
}
