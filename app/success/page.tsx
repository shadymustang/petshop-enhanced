import React, { Suspense } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SuccessClient from '../../components/SuccessClient';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-royalBlue/6 to-white">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-royalBlue">Booking Confirmed</h1>
        <p className="mt-4 text-slate-600">Thank you! Your grooming booking has been received.</p>
        <Suspense fallback={<div className="mt-2 font-mono text-sm text-slate-500">Loading...</div>}>
          <SuccessClient />
        </Suspense>
        <div className="mt-6">
          <Link href="/" className="bg-gold text-royalBlue px-6 py-3 rounded-full font-semibold">Back to Home</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
