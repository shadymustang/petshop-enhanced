"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function SuccessClient() {
  const params = useSearchParams()
  const bookingId = params ? params.get('bookingId') : null

  return (
    <>
      {bookingId && <p className="mt-2 font-mono text-sm text-slate-500">Booking ID: {bookingId}</p>}
    </>
  )
}
