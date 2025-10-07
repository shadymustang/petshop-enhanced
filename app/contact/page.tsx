import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ContactPage(){
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-bold text-royalBlue">Contact Us</h1>
        <p className="mt-4 text-slate-600">For inquiries, email <a className="text-royalBlue" href="mailto:hello@royalpetcare.example">hello@royalpetcare.example</a> or call <strong>+1 (555) 123-4567</strong>.</p>
      </main>
      <Footer />
    </div>
  )
}
