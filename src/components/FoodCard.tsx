import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingCart, Info } from 'lucide-react';
import { FoodItem } from '../types';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';

export const FoodCard: React.FC<{ item: FoodItem }> = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass rounded-[2rem] overflow-hidden group shadow-lg transition-all duration-500 hover:border-gold/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/default-food.svg';
          }}
        />
        <div className="absolute top-4 right-4 glass-dark px-3 py-1 rounded-full flex items-center gap-1 shadow-xl">
          <Star className="text-gold fill-gold" size={12} />
          <span className="text-[10px] font-bold text-gold tracking-widest">{item.rating}</span>
        </div>
        {item.isOffer && (
          <div className="absolute top-4 left-4 bg-accent-red text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
            {item.offerText}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-bold group-hover:text-gold transition-colors leading-tight">
            {item.name}
          </h3>
          <span className="text-gold font-bold font-serif whitespace-nowrap text-lg">
            ₹{item.price}
          </span>
        </div>
        <p className="text-sm text-white/50 line-clamp-2 mb-6 min-h-[40px] leading-relaxed">
          {item.description}
        </p>
        
        <div className="flex gap-3">
          <button 
            onClick={() => addToCart(item)}
            className="flex-1 bg-white text-black py-4 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-gold hover:text-black transition-all shadow-xl active:scale-95"
          >
            <ShoppingCart size={18} />
            Add
          </button>
          <button className="p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-white/50 hover:text-white">
            <Info size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

