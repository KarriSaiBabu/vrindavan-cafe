import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-bg-main text-white/50 pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gold/5 blur-[120px] rounded-full pointer-events-none opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-gold/20">V</div>
              <span className="text-3xl font-serif font-bold text-gold tracking-tight">
                Vrindavan <span className="text-white">Cafe</span>
              </span>
            </Link>
            <p className="text-white/40 leading-relaxed italic text-sm">
              "A legacy of spice, curated for the modern palate. Experience the convergence of heritage and haute cuisine."
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-all duration-500 group">
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif font-bold text-xl mb-8 flex items-center gap-2">
              <span className="w-8 h-px bg-gold/50"></span> Explore
            </h3>
            <ul className="space-y-4">
              {['Special Menu', 'Exclusive Offers', 'Our Legacy', 'Careers'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-xs uppercase tracking-[0.2em] font-bold hover:text-gold transition-colors block py-1 group">
                    <span className="opacity-0 group-hover:opacity-100 mr-2 transition-all text-gold">•</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-white font-serif font-bold text-xl mb-8 flex items-center gap-2">
              <span className="w-8 h-px bg-gold/50"></span> Hours
            </h3>
            <ul className="space-y-6">
              <li className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold/60">Weekdays</span>
                <span className="text-white font-serif italic text-lg">08:00 — 22:00</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold/60">Weekends</span>
                <span className="text-white font-serif italic text-lg">07:00 — 23:00</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-serif font-bold text-xl mb-8 flex items-center gap-2">
              <span className="w-8 h-px bg-gold/50"></span> Reserve
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20">
                  <MapPin className="text-gold" size={18} />
                </div>
                <span className="text-xs leading-relaxed text-white/50">Simhachalam, Visakhapatnam, Andhra Pradesh 530028</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0 border border-gold/20">
                  <Phone className="text-gold" size={18} />
                </div>
                <span className="text-xs font-bold text-white/50">+91 9374567746</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
          <p>© 2026 Vrindavan Cafe. Established Excellence.</p>
          <div className="flex gap-10">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Architecture</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">Engagement Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
