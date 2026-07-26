"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { User, Mail, Lock, Home } from "lucide-react";

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
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.2),transparent_50%)]" />
      <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />

      <div className="z-10 w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 tracking-tight mb-2">
            DAFTAR
          </h1>
          <p className="text-xs font-medium text-slate-400">Buat akun baru</p>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-slate-700/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <User size={14} /> Nama
              </label>
              <Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} /> Email
              </label>
              <Input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Lock size={14} /> Password
              </label>
              <Input type="password" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Home size={14} /> Kamar
              </label>
              <Input required value={form.room} onChange={e => setForm({...form, room: e.target.value})} placeholder="Contoh: A1-102" />
            </div>
            {error && <p className="text-xs text-red-400 bg-red-900/20 p-2 rounded-lg">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "DAFTAR"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
            <p className="text-xs text-slate-400">
              Sudah punya akun?{" "}
              <Link href="/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">MASUK</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
