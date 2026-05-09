import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, Leaf, Flame, Loader2 } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../constants';
import { FoodCard } from '../components/FoodCard';
import { cn } from '../lib/utils';
import { dbService } from '../services/db';
import { FoodItem } from '../types';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      try {
        const data = await dbService.getMenuItems();
        if (data && data.length > 0) {
          setItems(data);
        } else {
          // If Firestore is empty, use constants as fallback
          setItems(MENU_ITEMS as FoodItem[]);
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
        setItems(MENU_ITEMS as FoodItem[]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-bg-main">
      {/* Header */}
      <div className="py-20 px-4 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold blur-[120px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-6 block">The Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Our <span className="text-gradient italic">Grand Menu</span></h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed italic">
            "From the fiery curries of Rayalaseema to the coastal seafood of Nellore, explore the legendary spices of Andhra."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 sticky top-24 z-30 bg-bg-main/80 backdrop-blur-xl py-8 border-b border-white/5 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            <input 
              type="text" 
              placeholder="Search for Pesarattu, Biryani..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-8 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/20"
            />
          </div>
          
          <div className="flex gap-4 scroll-hide overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
            <button 
              onClick={() => setActiveCategory('All')}
              className={cn(
                "px-8 py-5 rounded-xl font-bold transition-all border",
                activeCategory === 'All' ? "bg-gold text-black border-gold" : "bg-transparent text-white/50 border-white/10 hover:border-gold/30 hover:text-white"
              )}
            >
              All Items
            </button>
            {CATEGORIES.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-5 rounded-xl font-bold transition-all border",
                  activeCategory === cat ? "bg-gold text-black border-gold" : "bg-transparent text-white/50 border-white/10 hover:border-gold/30 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
             <Loader2 size={48} className="text-gold animate-spin" />
             <p className="text-white/30 font-bold uppercase tracking-widest text-[10px]">Curating your experience...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-40">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search size={40} className="text-white/20" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-white mb-3">No Delicacies Found</h3>
            <p className="text-white/40 mb-10">Try adjusting your search or category filters.</p>
            <button 
              onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
              className="text-gold font-bold hover:underline py-3 px-8 rounded-full border border-gold/20"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Spice Legend - Desktop only */}
      <div className="fixed bottom-10 right-10 z-40 hidden xl:block">
        <div className="glass-dark p-6 rounded-2xl shadow-2xl flex flex-col gap-4 border-white/10">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/50">
            <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
              <Leaf size={16} className="text-green-500" />
            </div>
            <span>Vegetarian</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/50">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <Flame size={16} className="text-red-500" />
            </div>
            <span>Signature Spicy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
