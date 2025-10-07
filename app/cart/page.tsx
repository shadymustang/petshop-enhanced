import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function CartPage(){
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-bold text-royalBlue">Your Cart</h1>
        <p className="mt-4 text-slate-600">Your cart is empty. Browse products and add items to your cart.</p>
      </main>
      <Footer />
    </div>
  )
}
