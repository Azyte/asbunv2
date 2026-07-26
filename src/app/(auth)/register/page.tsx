"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", room: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) router.push("/login");
    else {
      const data = await res.json();
      setError(data.error || "Terjadi kesalahan");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-2xl font-bold text-center">Daftar Akun Baru</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nama Lengkap</label>
            <Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <Input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <div>
            <label className="text-sm font-medium">Nomor Kamar</label>
            <Input required value={form.room} onChange={e => setForm({...form, room: e.target.value})} placeholder="Contoh: A1-102" />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Loading..." : "Daftar"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Sudah punya akun? <Link href="/login" className="font-medium text-green-600">Masuk</Link>
        </p>
      </div>
    </div>
  );
}
