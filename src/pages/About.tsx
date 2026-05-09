import { motion } from 'motion/react';
import { Leaf, Award, Users, Utensils, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="pt-24 min-h-screen bg-bg-main text-white">
      {/* Hero Section */}
      <section className="h-[70vh] relative flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=2000" 
            alt="Spice Market"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-main/50 via-bg-main to-bg-main" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex items-center justify-center gap-3 text-gold uppercase tracking-[0.4em] text-xs font-bold mb-8"
          >
            <span className="w-12 h-px bg-gold/50"></span>
            Since 2011
            <span className="w-12 h-px bg-gold/50"></span>
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-tight"
          >
             Our Story: Taste of <br /> <span className="text-gradient hover:opacity-80 transition-opacity">Authentic Heritage</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-white/50 text-xl leading-relaxed italic max-w-2xl mx-auto"
          >
             "At Vrindavan Cafe, we don't just serve food; we serve memories of Andhra's traditional kitchens."
          </motion.p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 relative z-20">
         <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                 <div className="absolute -inset-4 bg-gold/10 blur-3xl rounded-full" />
                 <img src="https://images.unsplash.com/photo-1601050690597-df056fb1d745?auto=format&fit=crop&q=80&w=1000" alt="Kitchen" className="rounded-[40px] shadow-2xl relative z-10 border border-white/10" referrerPolicy="no-referrer" />
                 <div className="absolute -bottom-10 -right-10 glass-dark p-8 rounded-[32px] shadow-2xl max-w-xs md:block hidden z-20 border-white/10 animate-bounce-slow">
                    <Heart className="text-accent-red mb-4" size={32} />
                    <p className="font-serif font-bold text-xl text-gold mb-2">Passion for Spice</p>
                    <p className="text-white/40 text-sm leading-relaxed">Every spice mix is ground in-house following a secret family recipe passed through generations.</p>
                 </div>
              </div>
              <div className="space-y-10">
                <div>
                   <span className="text-gold text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Our Essence</span>
                   <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Culinary <span className="italic opacity-50">Philosophy</span></h2>
                </div>
                <p className="text-white/50 text-lg leading-relaxed">
                  Vrindavan Cafe was born from a simple desire: to bring the uncompromising, bold, and fiery flavors of authentic Andhra Pradesh cuisine to the heart of the modern world.
                </p>
                <div className="space-y-8">
                   {[
                     { icon: Leaf, title: 'Farm Fresh Ingredients', desc: 'We source our Guntur chilies and vegetables directly from local farmers.' },
                     { icon: Award, title: 'Traditional Techniques', desc: 'No shortcuts. We follow the slow-cooking "Dum" processes.' },
                     { icon: Users, title: 'A Community Flavor', desc: 'Vrindavan is a place for everyone to experience South Indian warmth.' },
                   ].map((item) => (
                     <div key={item.title} className="flex gap-6 group">
                        <div className="w-14 h-14 bg-white/5 text-gold rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-gold group-hover:text-black transition-all">
                           <item.icon size={24} />
                        </div>
                        <div>
                           <h4 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-gold transition-colors">{item.title}</h4>
                           <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
           </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-gold/5" />
         <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-7xl font-serif font-bold mb-10">Experience the <span className="text-gold italic">Tradition</span></h2>
            <Link to="/menu" className="inline-flex items-center gap-4 px-12 py-6 bg-gold text-black rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl active:scale-95 group">
               View Our Menu <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
         </div>
      </section>
    </div>
  );
}
