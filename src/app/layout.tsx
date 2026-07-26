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
      <body className={`${pjs.className} min-h-screen bg-slate-100 text-slate-950 antialiased`}>
        <AuthProvider>
          <div className="min-h-screen lg:flex lg:justify-center">
            <BottomNav />
            <main className="w-full min-h-screen bg-[#f4f7fb] pb-28 lg:pb-8 lg:pl-72">
              <div className="mx-auto w-full max-w-6xl px-0 sm:px-4 lg:px-8">
                <div className="mx-auto w-full max-w-md sm:max-w-2xl lg:max-w-none">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
