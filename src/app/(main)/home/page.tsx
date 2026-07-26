"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Search, Utensils, ShoppingBag, Store, Repeat, Users, Car } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const SHORTCUTS = [
  { href: "/food", icon: Utensils, label: "Food Order", color: "bg-green-100 text-green-700" },
  { href: "/jastip/board", icon: ShoppingBag, label: "Jastip", color: "bg-blue-100 text-blue-700" },
  { href: "/marketplace", icon: Store, label: "Marketplace", color: "bg-purple-100 text-purple-700" },
  { href: "/borrow", icon: Repeat, label: "Borrow", color: "bg-orange-100 text-orange-700" },
  { href: "/community/nebeng", icon: Car, label: "Nebeng", color: "bg-pink-100 text-pink-700" },
  { href: "/community/cari-partner", icon: Users, label: "Cari Partner", color: "bg-cyan-100 text-cyan-700" },
];

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="px-4 pt-6">
      <div className="mb-6">
        <p className="text-sm text-gray-500">Halo,</p>
        <h1 className="text-xl font-bold">{session?.user?.name || "Penghuni"} 👋</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Cari makanan, barang, atau merchant..." className="pl-9" />
      </div>

      <h2 className="mb-3 text-sm font-semibold text-gray-700">Menu Cepat</h2>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {SHORTCUTS.map(({ href, icon: Icon, label, color }) => (
          <Link key={href} href={href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center gap-2 p-4">
                <div className={`rounded-full p-2 ${color}`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-medium text-center">{label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="mb-3 text-sm font-semibold text-gray-700">Info</h2>
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-600">
            Selamat datang di ASBUN! Titip makanan, jual beli barang, atau cari teman aktivitas — semua bisa dilakukan di sini.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
