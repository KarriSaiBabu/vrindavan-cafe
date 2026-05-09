import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 px-4 min-h-screen flex flex-col items-center justify-center text-center bg-bg-main">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="w-32 h-32 bg-gold/10 rounded-full flex items-center justify-center mb-10 relative"
        >
          <div className="absolute inset-0 bg-gold/5 blur-2xl rounded-full" />
          <ShoppingBag size={56} className="text-gold relative z-10" />
        </motion.div>
        <h1 className="text-4xl font-serif font-bold mb-6 text-white italic">Your Cart is <span className="text-gradient">Empty</span></h1>
        <p className="text-white/40 mb-10 max-w-sm leading-relaxed italic">"A table without items is just a canvas awaiting your signature selection."</p>
        <Link to="/menu" className="px-12 py-5 bg-gold text-black font-bold rounded-xl shadow-2xl shadow-gold/20 hover:scale-105 transition-all flex items-center gap-3">
          Explore Menu <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-bg-main text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-12">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/menu" className="hover:text-gold transition-colors">Menu</Link>
          <ChevronRight size={12} />
          <span className="text-gold">Cart Archive</span>
        </div>

        <h1 className="text-5xl font-serif font-bold mb-16 italic">Selection <span className="text-gradient">Gallery</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-dark rounded-[2rem] p-8 flex flex-col sm:flex-row items-center gap-8 shadow-2xl border border-white/5 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-gold/10 transition-colors" />
                
                <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border border-white/10 group-hover:border-gold/30 transition-colors">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <h3 className="text-2xl font-serif font-bold group-hover:text-gold transition-colors">{item.name}</h3>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">{item.category}</p>
                  <p className="text-gold font-bold font-serif text-xl">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-5 bg-white/5 rounded-xl p-2 border border-white/10">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-black transition-all text-white/50"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="font-bold w-6 text-center text-lg">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gold hover:text-black transition-all text-white/50"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="text-right hidden sm:block min-w-[80px]">
                  <p className="text-2xl font-serif font-bold text-white">₹{item.price * item.quantity}</p>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-4 text-white/20 hover:text-accent-red transition-all hover:bg-accent-red/10 rounded-xl"
                >
                  <Trash2 size={22} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="glass-dark rounded-[2.5rem] p-10 sticky top-32 shadow-2xl border border-white/5 relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 blur-[80px] rounded-full pointer-events-none" />
              <h2 className="text-2xl font-serif font-bold mb-10 border-b border-white/5 pb-4">Investment <span className="opacity-50">Summary</span></h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between text-white/40 text-xs font-bold uppercase tracking-widest">
                  <span>Subtotal ({totalItems} selections)</span>
                  <span className="text-white">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-white/40 text-xs font-bold uppercase tracking-widest">
                  <span>Concierge Delivery</span>
                  <span className="text-gold">Complimentary</span>
                </div>
                <div className="flex justify-between text-white/40 text-xs font-bold uppercase tracking-widest">
                  <span>Culinary Tax (GST 5%)</span>
                  <span className="text-white">₹{Math.round(totalPrice * 0.05)}</span>
                </div>
                <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                  <span className="font-serif font-bold text-lg italic">Total Investment</span>
                  <span className="text-3xl font-serif font-bold text-gold text-gradient">₹{totalPrice + Math.round(totalPrice * 0.05)}</span>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="w-full py-6 bg-gold text-black text-center rounded-xl font-bold shadow-2xl shadow-gold/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group text-lg"
              >
                Proceed to Checkout
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <div className="flex items-center justify-center gap-2 mt-8 text-[10px] text-white/20 uppercase tracking-[0.3em] font-bold">
                <div className="w-4 h-4 bg-gold/10 rounded-full flex items-center justify-center"><Trash2 size={10} className="text-gold" /></div>
                End-to-End Encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
