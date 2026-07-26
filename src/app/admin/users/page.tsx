"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => { fetch("/api/admin/users").then(r => r.json()).then(setUsers); }, []);

  return (
    <div className="px-4 pt-4">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-1 text-sm text-gray-500 mb-4"><ArrowLeft size={16} /> Kembali</Link>
      <h1 className="text-xl font-bold mb-4">Kelola Users</h1>
      <div className="space-y-3">
        {users.map(u => (
          <Card key={u._id}><CardContent className="p-4"><p className="font-medium">{u.name}</p><p className="text-xs text-gray-500">{u.email} · {u.role}</p></CardContent></Card>
        ))}
      </div>
    </div>
  );
}
