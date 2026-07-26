"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Sparkles } from "lucide-react";

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
    <div className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-10">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500" />
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />

      <div className="relative mb-10 text-white">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur"><Sparkles size={13} /> ASBUN Pro</div>
        <h1 className="text-5xl font-black tracking-tight">ASBUN</h1>
        <p className="mt-2 text-sm text-emerald-50">Asrama Bantu - semua kebutuhan asrama dalam satu tempat.</p>
      </div>

      <div className="relative rounded-[2rem] bg-white/90 p-5 shadow-2xl backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-600">Email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" required />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-600">Password</label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full h-12 rounded-2xl" disabled={loading}>
            {loading ? "Loading..." : "Masuk"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          Belum punya akun? <Link href="/register" className="font-extrabold text-emerald-600">Daftar</Link>
        </p>
      </div>
    </div>
  );
}
