"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (session?.user) {
      fetch("/api/profile").then(r => r.json()).then(setProfile);
    }
  }, [session, status, router]);

  if (!profile) return <div className="flex justify-center pt-20"><p>Memuat...</p></div>;

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <User size={32} />
        </div>
        <div>
          <h1 className="text-xl font-bold">{profile.name}</h1>
          <p className="text-sm text-gray-500">Kamar {profile.room} · {profile.email}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">⭐ {profile.rating?.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Pesanan Saya</p>
            <p className="text-lg font-bold text-gray-900">{profile.orderCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Jastip Selesai</p>
            <p className="text-lg font-bold text-green-600">{profile.jastipCount}</p>
          </CardContent>
        </Card>
      </div>

      <Button variant="destructive" className="w-full flex items-center gap-2" onClick={() => signOut()}>
        <LogOut size={18} /> Keluar
      </Button>
    </div>
  );
}
