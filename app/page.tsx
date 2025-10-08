"use client"

import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { getProducts, Product } from '@/lib/products';

const PRODUCTS: Product[] = getProducts();

export default function Page() {
  const router = useRouter();

  async function handleBooking(formData: FormData) {
    // called from the form's onSubmit handler (client-side)
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('/api/book-grooming', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json?.bookingId) {
        // redirect to success page with booking id
        router.push(`/success?bookingId=${json.bookingId}`);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Could not submit booking.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-royalBlue/5 via-royalBlue/3 to-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold text-royalBlue">
              Royal meals & care for your beloved pets
            </motion.h1>
            <p className="mt-4 text-slate-600 max-w-xl">
              Premium, vet-approved recipes & thoughtfully crafted pet products — delivered with care. Book grooming sessions, subscribe to regular deliveries, or shop treats and toys.
            </p>
            <div className="mt-6 flex gap-3">
              <button className="bg-gold text-royalBlue px-5 py-3 rounded-full font-semibold shadow">Shop Now</button>
              <a href="#grooming" className="px-5 py-3 rounded-full border border-slate-200">Book Grooming</a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="font-semibold text-royalBlue">Vet-approved</div>
                <div className="text-slate-500">Formulated with veterinarians and nutritionists.</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="font-semibold text-royalBlue">Trusted Delivery</div>
                <div className="text-slate-500">Safe, scheduled deliveries with tracking.</div>
              </div>
            </div>
          </div>

            <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="rounded-2xl overflow-hidden shadow-xl">
              <img src={PRODUCTS[0]?.img} alt="hero" className="w-full h-auto object-cover rounded-2xl" />
            </motion.div>
        </section>

        {/* Products */}
        <section id="products" className="mt-12">
          <h2 className="text-2xl font-bold text-royalBlue">Featured Products</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p) => (
              <article key={p.id} className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition">
                  <div className="h-44 w-full overflow-hidden rounded-lg">
                    <img src={p.img} alt={p.name} className="object-cover w-full h-full" />
                  </div>
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-slate-800">{p.name}</div>
                    <div className="text-xs text-slate-500">{p.unit} • {p.tags?.[0]}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-royalBlue">₹{p.price}</div>
                    <div className="text-xs text-gold/80">{p.tags?.[0]}</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-royalBlue text-white py-2 rounded-lg">Add to Cart</button>
                  <button className="flex-1 border border-slate-200 py-2 rounded-lg">View</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Grooming booking */}
        <section id="grooming" className="mt-16 bg-white rounded-2xl p-8 shadow">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-royalBlue">Book a Grooming Session</h3>
              <p className="mt-2 text-slate-600">Choose a convenient time and our professional groomers will take care of the rest. We offer bathing, trimming, nail care, and premium treatments.</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>• Full grooming packages available</li>
                <li>• Experienced groomers & pet-friendly products</li>
                <li>• Home pickup & drop-off (select areas)</li>
              </ul>
            </div>

            <div>
              <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); handleBooking(fd); }}>
                <div>
                  <label className="text-xs font-semibold">Full name</label>
                  <input name="name" required className="mt-1 w-full p-3 border rounded" />
                </div>

                <div>
                  <label className="text-xs font-semibold">Phone</label>
                  <input name="phone" required className="mt-1 w-full p-3 border rounded" />
                </div>

                <div>
                  <label className="text-xs font-semibold">Pet Type</label>
                  <select name="petType" required className="mt-1 w-full p-3 border rounded">
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold">Preferred Date</label>
                    <input name="date" type="date" required className="mt-1 w-full p-3 border rounded" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold">Preferred Time</label>
                    <input name="time" type="time" required className="mt-1 w-full p-3 border rounded" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold">Notes</label>
                  <textarea name="notes" rows={3} className="mt-1 w-full p-3 border rounded" placeholder="Allergies, special requests..." />
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <button type="submit" className="bg-royalBlue text-white px-5 py-3 rounded-full font-semibold">Book Now</button>
                  <button type="reset" className="px-5 py-3 rounded-full border">Reset</button>
                </div>
              </form>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
