import { motion } from 'framer-motion';

export default function CartItem({ item, onRemove, onQty }) {
  return (
    <motion.li layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="flex items-center gap-4">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-500">₹{item.price}</div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onQty(item.id, item.qty - 1)}>-</button>
        <div>{item.qty}</div>
        <button onClick={() => onQty(item.id, item.qty + 1)}>+</button>
      </div>
      <button onClick={() => onRemove(item.id)} className="text-sm text-red-500">Remove</button>
    </motion.li>
  );
}
