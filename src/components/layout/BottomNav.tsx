"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, ShoppingBag, User, Wallet, Repeat, LayoutDashboard, Store } from "lucide-react";

const DESKTOP_NAV = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/food", label: "Food", icon: Utensils },
  { href: "/jastip/board", label: "Jastip", icon: ShoppingBag },
  { href: "/marketplace", label: "Market", icon: Store },
  { href: "/borrow", label: "Borrow", icon: Repeat },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/admin/dashboard", label: "Admin", icon: LayoutDashboard },
];

const MOBILE_NAV = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/food", label: "Food", icon: Utensils },
  { href: "/jastip/board", label: "Jastip", icon: ShoppingBag },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <>
      <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:z-40 lg:flex lg:h-screen lg:w-72 lg:flex-col lg:border-r lg:border-white/70 lg:bg-white/80 lg:px-5 lg:py-6 lg:shadow-2xl lg:shadow-slate-900/5 lg:backdrop-blur-xl">
        <Link href="/home" className="mb-8 flex items-center gap-3 px-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 font-black text-white shadow-lg shadow-emerald-500/25">A</div>
          <div>
            <p className="text-lg font-black tracking-tight text-slate-900">ASBUN</p>
            <p className="text-xs font-medium text-slate-400">Asrama Bantu</p>
          </div>
        </Link>
        <nav className="space-y-2">
          {DESKTOP_NAV.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${isActive ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}>
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1rem)] max-w-md -translate-x-1/2 rounded-[1.75rem] border border-white/60 bg-white/85 px-2 pb-safe shadow-2xl shadow-slate-900/15 backdrop-blur-xl sm:bottom-5 sm:w-[calc(100%-2rem)] lg:hidden">
        <div className="flex h-16 items-center justify-around">
          {MOBILE_NAV.map(({ href, label, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`relative flex h-12 min-w-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 transition-all ${isActive ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30" : "text-slate-400 hover:text-slate-700"}`}>
                <Icon size={20} />
                <span className="text-[9px] font-semibold">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
