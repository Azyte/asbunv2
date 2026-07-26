"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Sparkles, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) {
      setError("Email atau password salah");
      setLoading(false);
    } else {
      router.push("/home");
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Retro Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.2),transparent_50%)]" />
      <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
      
      <div className="z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-2xl blur opacity-75 animate-pulse" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 border border-slate-700">
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-400">A</span>
            </div>
          </div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 tracking-tight mb-2">
            ASBUN
          </h1>
          <p className="text-xs font-medium text-slate-400">Asrama Bantu</p>
        </div>

        {/* Card */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-700/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} /> Email
              </label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                <Lock size={14} /> Password
              </label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            {error && <p className="text-xs text-red-400 bg-red-900/20 p-2 rounded-lg">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "MASUK"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
            <p className="text-xs text-slate-400">
              Belum punya akun?{" "}
              <Link href="/register" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">DAFTAR</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
