import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.article
        layout
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-shadow"
      >
        <div className="relative h-56 w-full overflow-hidden rounded-lg">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>

        <div className="mt-3">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.short}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-bold">₹{product.price}</span>
            <button
              onClick={() => setOpen(true)}
              className="text-sm px-3 py-1 border rounded-full"
            >
              Quick View
            </button>
          </div>
        </div>
      </motion.article>

      {open && <QuickViewModal product={product} onClose={() => setOpen(false)} />}
    </>
  );
}
