import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { AuthProvider } from "@/components/layout/AuthProvider";

const pjs = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASBUN - Asrama Bantu",
  description: "Platform kebutuhan sehari-hari penghuni asrama",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${pjs.className} bg-slate-100 antialiased`}>
        <AuthProvider>
          <div className="mx-auto min-h-screen max-w-md bg-[#f4f7fb] shadow-2xl relative pb-20 overflow-x-hidden">
            {children}
            <BottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
