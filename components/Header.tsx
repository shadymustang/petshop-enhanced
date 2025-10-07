"use client";

import React from 'react';
import Link from 'next/link';
import { PawPrint, ShoppingCart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-royalBlue flex items-center justify-center text-white shadow">
            <PawPrint size={18} />
          </div>
          <div>
            <div className="font-bold text-royalBlue">Royal Pet Care</div>
            <div className="text-xs text-slate-500">Premium pet food & grooming</div>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="#products" className="text-sm text-slate-700 hover:text-royalBlue">Products</Link>
          <Link href="#grooming" className="text-sm text-slate-700 hover:text-royalBlue">Grooming</Link>
          <Link href="/contact" className="text-sm text-slate-700 hover:text-royalBlue">Contact</Link>
          <Link href="/cart" className="flex items-center gap-2 bg-royalBlue text-white px-3 py-2 rounded-md">
            <ShoppingCart size={16} />
            <span className="text-sm">Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
