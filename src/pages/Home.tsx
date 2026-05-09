import { motion } from 'motion/react';
import { ArrowRight, Utensils, Clock, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FoodCard } from '../components/FoodCard';
import { MENU_ITEMS, CATEGORIES } from '../constants';

export function Home() {
  const featuredItems = MENU_ITEMS.filter(item => item.isRecommended || item.isOffer).slice(0, 4);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blob-gold blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blob-red blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-2 text-gold uppercase tracking-[0.3em] text-xs font-bold">
                <span className="w-10 h-[1px] bg-gold"></span>
                Authentic Andhra Taste
              </div>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-8 leading-[1.1]">
                Traditional Spice,<br />
                <span className="text-gradient">Modern Elegance.</span>
              </h1>
              <p className="text-xl text-white/60 mb-10 max-w-lg leading-relaxed">
                Experience the legendary flavors of Andhra Pradesh. From the fiery Guntur chilies to the aromatic Gongura, every bite at Vrindavan is a celebration of heritage.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/menu" className="px-12 py-5 bg-gold text-black rounded-full font-bold text-lg hover:scale-105 transition-transform bg-gold shadow-lg shadow-gold/20 flex items-center gap-3">
                  Order Now <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="px-10 py-5 border border-white/20 text-white rounded-full font-bold text-lg backdrop-blur-sm hover:bg-white/5 transition-all">
                  Explore Menu
                </Link>
              </div>

              <div className="mt-8 flex gap-12 border-t border-white/10 pt-10">
                <div className="flex flex-col">
                  <span className="text-3xl font-serif font-bold text-gold">15k+</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Happy Guests</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-serif font-bold text-gold">4.9/5</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Average Rating</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-serif font-bold text-gold">25+</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Secret Recipes</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-[550px] mx-auto">
                <div className="absolute inset-0 bg-gold/10 rounded-[100px] blur-3xl transform rotate-12" />
                <img 
                  src="/images/pesarattu.jpg" 
                  alt="MLA Pesarattu"
                  className="w-full h-full object-cover rounded-[100px] shadow-2xl relative z-10 border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl shadow-2xl z-20 animate-bounce-slow">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-lg">
                        <Utensils className="text-black" size={24} />
                      </div>
                      <div>
                        <p className="font-serif font-bold text-xl text-gold">MLA Pesarattu</p>
                        <p className="text-sm text-white/50 uppercase tracking-widest font-bold">Bestseller</p>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16 px-4 border-b border-white/5 pb-8">
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Hand-picked</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Featured <span className="italic opacity-50">Delicacies</span></h2>
            </div>
            <Link to="/menu" className="text-gold font-bold hover:underline mb-2">View All Menu</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16 px-4 border-b border-white/5 pb-8">
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Hand-picked</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Featured <span className="italic opacity-50">Delicacies</span></h2>
            </div>
            <Link to="/menu" className="text-gold font-bold hover:underline mb-2">View All Menu</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <footer className="py-20 bg-gold relative overflow-hidden mt-20">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10 text-black">
            <div className="flex gap-12 font-bold uppercase tracking-widest text-xs">
               <div className="flex items-center gap-3"><Clock size={18} /> Open: 7 AM - 11 PM</div>
               <div className="flex flex-col gap-1">
                 <span className="flex items-center gap-3"><MapPin size={18} /> Simhachalam, Visakhapatnam</span>
                 <span className="text-[10px] uppercase tracking-[0.2em] text-black/70">Andhra Pradesh 530028</span>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <span className="font-bold text-[10px] uppercase tracking-[0.2em] animate-pulse">● Live Offers: 20% OFF on first order</span>
               <div className="w-px h-6 bg-black/20" />
               <Phone size={18} />
               <span className="font-bold">+91 9374567746</span>
            </div>
         </div>
      </footer>
    </div>
  );
}
