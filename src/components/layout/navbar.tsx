"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stethoscope, Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <header className="pointer-events-auto bg-white/90 backdrop-blur-md shadow-soft border border-gray-100 rounded-full w-full max-w-5xl px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-gray-900 ml-2">
          <div className="bg-primary text-white p-1.5 rounded-full">
            <Stethoscope className="w-5 h-5" />
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 bg-gray-50/80 px-6 py-2 rounded-full">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors ${pathname === '/' ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Beranda
          </Link>
          <Link
            href="/konsultasi"
            className={`text-sm font-semibold transition-colors ${pathname === '/konsultasi' ? 'text-primary' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Konsultasi SMART
          </Link>
          <Link
            href="/#produk"
            className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            Produk
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center">
            <Button variant="ghost" className="rounded-full text-gray-600 font-semibold hover:bg-gray-100">Log In</Button>
            <Button className="rounded-full font-semibold shadow-glow ml-2">
              <Link href="/konsultasi" className="flex items-center">
                Mulai Konsultasi <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </div>

      </header>
    </div>
  );
}
