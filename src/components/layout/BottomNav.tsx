"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, ShoppingBag, Store, User } from "lucide-react";

const NAV_ITEMS = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/food", label: "Food", icon: Utensils },
  { href: "/jastip/board", label: "Jastip", icon: ShoppingBag },
  { href: "/marketplace", label: "Market", icon: Store },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/register") return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-[2rem] border border-white/60 bg-white/80 px-3 pb-safe shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={`relative flex h-12 w-14 flex-col items-center justify-center gap-1 rounded-2xl transition-all ${isActive ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30" : "text-slate-400 hover:text-slate-700"}`}>
              <Icon size={20} />
              <span className="text-[9px] font-semibold">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
