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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white pb-safe">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={`flex flex-col items-center justify-center w-16 gap-1 ${isActive ? "text-green-600" : "text-gray-500 hover:text-gray-900"}`}>
              <Icon size={24} className={isActive ? "fill-green-100" : ""} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
