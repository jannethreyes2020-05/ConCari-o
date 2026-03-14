import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, clearCart, isOpen, setIsOpen } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 right-0 md:bottom-8 md:right-8 w-full md:w-96 bg-[#1A1A1A] border border-white/10 md:rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[80vh]"
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-[#FF8C69]" />
              <h2 className="text-xl font-bold">Tu Carrito</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Tu carrito está vacío.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-black/30 p-3 rounded-2xl border border-white/5">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-gray-400 text-xs">${item.price} x {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${item.price * item.quantity}</p>
                      <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300 text-xs mt-1 flex items-center gap-1 justify-end w-full">
                        <Trash2 size={12} /> Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/50 backdrop-blur-md">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-400">Total</span>
                <span className="text-2xl font-bold">${total}</span>
              </div>
              <div className="flex flex-col gap-3">
                <button className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  Proceder al pago
                </button>
                <button className="w-full py-3 rounded-xl bg-[#0070BA] text-white font-semibold hover:bg-[#005ea6] transition-colors flex items-center justify-center gap-2">
                  <CreditCard size={18} /> Pagar con PayPal
                </button>
                <button onClick={clearCart} className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors">
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
