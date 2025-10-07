import Modal from 'react-modal';
import ImageZoom from './ImageZoom';
import { motion } from 'framer-motion';

Modal.setAppElement('#__next');

export default function QuickViewModal({ product, onClose }) {
  if(!product) return null;
  return (
    <Modal isOpen={!!product} onRequestClose={onClose} className="modal" overlayClassName="overlay">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.18 }}>
        <div className="p-6 bg-white rounded-lg max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ImageZoom src={product.image} alt={product.name} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="mt-2 text-gray-600">{product.longDescription}</p>
              <div className="mt-4">₹{product.price}</div>
              <button className="mt-6 btn-primary">Add to cart</button>
            </div>
          </div>
          <div className="mt-4 text-right">
            <button onClick={onClose} className="text-sm text-gray-500">Close</button>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}
