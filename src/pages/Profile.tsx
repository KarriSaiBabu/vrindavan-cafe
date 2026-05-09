import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Package, Heart, History, User, MapPin, ChevronRight, Settings, LogOut, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
import { dbService } from '../services/db';

export function Profile() {
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const data = await dbService.getUserOrders(user.uid);
          if (data) setOrders(data);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const activeOrder = orders.find(o => 
    o.status !== 'delivered' && o.status !== 'cancelled'
  );

  return (
    <div className="pt-32 pb-20 min-h-screen bg-bg-main text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-dark p-10 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mb-6 border-4 border-black shadow-2xl overflow-hidden">
                  {profile?.avatar ? (
                    <img src={profile.avatar} alt={profile.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-black" />
                  )}
                </div>
                <h2 className="text-2xl font-serif font-bold mb-1 italic">{profile?.displayName || 'Legacy Guest'}</h2>
                <p className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Culinary Connoisseur</p>
                
                <div className="w-full pt-6 border-t border-white/5 space-y-4">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <span>Rank</span>
                    <span className="text-gold">Platinum Member</span>
                  </div>
                </div>
              </div>
            </div>

            <nav className="glass-dark rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 divide-y divide-white/5">
              {[
                { id: 'orders', label: 'Active Status', icon: Package, active: true },
                { id: 'archives', label: 'Taste Archives', icon: History },
                { id: 'favs', label: 'Saved Essence', icon: Heart },
                { id: 'locs', label: 'Vault Locations', icon: MapPin },
                { id: 'sys', label: 'System Prefs', icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  className={cn(
                    "w-full flex items-center justify-between px-8 py-5 group transition-all",
                    item.active ? "bg-gold text-black" : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className={cn("transition-transform group-hover:translate-x-1", item.active && "text-black")} />
                </button>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-8 py-5 text-accent-red hover:bg-accent-red/5 transition-all"
              >
                <LogOut size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">Seal Vault</span>
              </button>
            </nav>
          </div>

          <div className="lg:col-span-3">
             <div className="mb-12">
               <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block">Dashboard</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">Welcome Back, <span className="italic opacity-50">{profile?.displayName?.split(' ')[0] || 'User'}</span></h1>
              <p className="text-white/40 text-lg italic leading-relaxed">"Governance of your culinary experience starts here."</p>
            </div>

            <div className="space-y-10">
              {/* Order Status Visualization */}
              {orders.length > 0 && orders.some(o => o.status !== 'delivered' && o.status !== 'cancelled') && (
                <div className="glass-dark p-10 rounded-[2.5rem] shadow-2xl border border-white/5 bg-gradient-to-r from-gold/5 via-transparent to-transparent relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                     <div className="flex-1 space-y-6">
                        <div>
                          <span className="px-4 py-2 bg-gold/10 text-gold border border-gold/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-4 inline-block">Active Culinary Journey</span>
                          <h3 className="text-3xl font-serif font-bold mb-2 text-white">Order #{orders.find(o => o.status !== 'delivered')?.id.slice(-8).toUpperCase()}</h3>
                          <p className="text-white/40 text-sm italic">Status: <span className="font-bold text-gold uppercase tracking-widest ml-2">{orders.find(o => o.status !== 'delivered')?.status}</span></p>
                        </div>
                        <div className="flex gap-3">
                          <div className={cn("flex-1 h-1.5 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.4)]", orders.some(o => o.status === 'pending' || o.status === 'preparing') ? 'bg-gold' : 'bg-white/10')} />
                          <div className={cn("flex-1 h-1.5 rounded-full", orders.some(o => o.status === 'preparing') ? 'bg-gold' : 'bg-white/10')} />
                          <div className={cn("flex-1 h-1.5 rounded-full", orders.some(o => o.status === 'delivered') ? 'bg-gold' : 'bg-white/10')} />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                          <span className={cn(orders.some(o => o.status === 'pending') && 'text-gold')}>Kitchen</span>
                          <span className={cn(orders.some(o => o.status === 'preparing') && 'text-gold')}>transit</span>
                          <span className={cn(orders.some(o => o.status === 'delivered') && 'text-gold')}>delivery</span>
                        </div>
                     </div>
                     <div className="w-1/3 aspect-square max-w-[160px] relative">
                        <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse blur-xl" />
                        <div className="absolute inset-2 bg-gold rounded-full flex items-center justify-center text-black shadow-2xl">
                           <Package size={56} />
                        </div>
                     </div>
                  </div>
                </div>
              )}

              {/* History Table */}
              <div className="glass-dark rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
                <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                  <h2 className="text-2xl font-serif font-bold italic">Taste <span className="opacity-40">Archives</span></h2>
                  <button className="text-gold font-bold text-xs uppercase tracking-widest border-b border-gold/30 hover:border-gold transition-all">Full History</button>
                </div>
                <div className="overflow-x-auto">
                  {isLoading ? (
                    <div className="p-20 flex justify-center">
                       <Loader2 className="animate-spin text-gold" size={32} />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="p-20 text-center">
                       <p className="text-white/20 uppercase tracking-widest font-bold text-[10px]">No signature orders recorded</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-white/[0.01] text-white/30 font-bold uppercase text-[10px] tracking-[0.2em]">
                        <tr>
                          <th className="px-10 py-8 text-left">Record ID</th>
                          <th className="px-10 py-8 text-left">Timeline</th>
                          <th className="px-10 py-8 text-left">Investment</th>
                          <th className="px-10 py-8 text-left">Process</th>
                          <th className="px-10 py-8 text-right">Artifacts</th>
                        </tr>
                      </thead>
                      <tbody className="font-bold text-sm text-white/70">
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-white/[0.02] transition-colors border-t border-white/5 group">
                            <td className="px-10 py-8 text-white group-hover:text-gold transition-colors font-mono">#{o.id.slice(-8).toUpperCase()}</td>
                            <td className="px-10 py-8 font-normal text-white/40 italic">
                               {o.createdAt?.seconds ? new Date(o.createdAt.seconds * 1000).toLocaleDateString() : 'Processing'}
                            </td>
                            <td className="px-10 py-8 font-serif text-lg text-gold">₹{o.total}</td>
                            <td className="px-10 py-8">
                              <span className={cn(
                                "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest",
                                (o.status !== 'delivered' && o.status !== 'cancelled') ? "bg-gold/10 text-gold border border-gold/20" : "bg-white/5 text-white/40 border border-white/10"
                              )}>
                                {(o.status !== 'delivered' && o.status !== 'cancelled') ? <History size={12} className="animate-spin-slow" /> : <CheckCircle2 size={12} />}
                                {o.status}
                              </span>
                            </td>
                            <td className="px-10 py-8 text-right">
                              <button className="px-4 py-2 border border-white/10 rounded-lg text-[10px] uppercase font-bold tracking-widest hover:bg-white/5 transition-all">Digital PDF</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
