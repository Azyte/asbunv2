import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { AuthProvider } from "@/components/layout/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASBUN - Asrama Bantu",
  description: "Platform kebutuhan sehari-hari penghuni asrama",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 antialiased`}>
        <AuthProvider>
          <div className="mx-auto min-h-screen max-w-md bg-white shadow-xl relative pb-20">
            {children}
            <BottomNav />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
