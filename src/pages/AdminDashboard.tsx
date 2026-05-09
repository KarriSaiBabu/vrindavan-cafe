import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Users, Settings, Plus, Search, Edit3, Trash2, CheckCircle, Clock, X, Upload, Bell, Package } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { cn } from '../lib/utils';
import { dbService } from '../services/db';
import { FoodItem, Order } from '../types';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function AdminDashboard() {
  const { user, profile, isStaticAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'menu' | 'orders' | 'users' | 'notifications'>('orders');
  const [items, setItems] = useState<FoodItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newItem, setNewItem] = useState<Omit<FoodItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1000',
    rating: 5
  });

  useEffect(() => {
    if (!user && !isStaticAdmin) {
      navigate('/admin-login');
      return;
    }
    
    if (!isStaticAdmin && profile && profile.role !== 'admin') {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
      return;
    }
    
    fetchData();
  }, [user, profile, isStaticAdmin, navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const menuItems = await dbService.getMenuItems();
      const allOrders = await dbService.getAllOrders();
      
      if (menuItems) setItems(menuItems);
      if (allOrders) setOrders(allOrders);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      await dbService.addMenuItem(newItem);
      toast.success('Item added to menu');
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin-login');
  };

  const handleStatusUpdate = async (orderId: string, status: Order['status']) => {
    try {
      await dbService.updateOrderStatus(orderId, status);
      toast.success(`Order status updated to ${status}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const stats = [
    { label: 'Total Revenue', value: '₹452,800', icon: ShoppingBag, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Active Orders', value: orders.filter(o => o.status === 'pending' || o.status === 'preparing').length.toString(), icon: Package, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Legacy Members', value: '1.2k', icon: Users, color: 'text-gold', bg: 'bg-gold/10' },
    { label: 'Menu Artifacts', value: items.length.toString(), icon: UtensilsCrossed, color: 'text-gold', bg: 'bg-gold/10' },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-bg-main flex text-white">
      {/* Sidebar */}
      <aside className="w-72 bg-white/[0.02] border-r border-white/5 hidden lg:flex flex-col sticky top-24 h-[calc(100vh-6rem)] shadow-2xl">
        <div className="p-10">
          <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30 mb-10">Administrative Vault</h2>
          <nav className="space-y-3">
            {[
              { id: 'menu', label: 'Curate Menu', icon: UtensilsCrossed },
              { id: 'orders', label: 'Order Archives', icon: ShoppingBag },
              { id: 'users', label: 'Member Registry', icon: Users },
              { id: 'settings', label: 'System Codex', icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all text-xs uppercase tracking-widest",
                  activeTab === item.id 
                    ? "bg-gold text-black shadow-xl shadow-gold/10" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-10 border-t border-white/5">
           <div className="glass-dark p-6 rounded-2xl border border-white/10 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
             <p className="text-[10px] font-bold text-gold uppercase mb-2 tracking-widest relative z-10">Principal Overseer</p>
             <p className="font-serif font-bold text-lg relative z-10">Master Admin</p>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
             <span className="text-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">Operations Control</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 italic">Vault <span className="text-gradient">Intelligence</span></h1>
            <p className="text-white/40 italic">"Governing the essence of Andhra culinary legacy."</p>
          </div>
          <div className="flex flex-wrap gap-6">
             <button className="flex items-center gap-3 bg-white/5 px-8 py-4 rounded-xl border border-white/10 font-bold hover:bg-white/10 transition-all text-xs uppercase tracking-widest">
               <Search size={18} className="text-gold" /> Filter
             </button>
             <button 
               onClick={() => setIsModalOpen(true)}
               className="flex items-center gap-3 bg-gold text-black px-8 py-4 rounded-xl font-bold shadow-2xl shadow-gold/10 hover:scale-105 transition-all group text-xs uppercase tracking-widest"
             >
               <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Manifest Entry
             </button>
             <button
               onClick={handleLogout}
               className="flex items-center gap-3 bg-red-500 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-red-500/20 hover:bg-red-400 transition-all text-xs uppercase tracking-widest"
             >
               Logout
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-dark p-10 rounded-[2.5rem] shadow-2xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-gold/10 transition-colors" />
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-8 border border-gold/20", stat.bg)}>
                <stat.icon className={stat.color} size={28} />
              </div>
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <p className="text-4xl font-serif font-bold text-white group-hover:scale-110 transition-transform origin-left">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Active Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-dark rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5"
            >
              <div className="p-10 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/[0.02]">
                <h2 className="text-3xl font-serif font-bold italic">Order <span className="opacity-40">Archives</span></h2>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                  {['All', 'Pending', 'Preparing', 'Delivered'].map(status => (
                    <button key={status} className="px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all">{status}</button>
                  ))}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/[0.01]">
                    <tr className="text-left text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">
                      <th className="px-10 py-8">Order ID</th>
                      <th className="px-10 py-8">Customer</th>
                      <th className="px-10 py-8">Items</th>
                      <th className="px-10 py-8">Total</th>
                      <th className="px-10 py-8">Status</th>
                      <th className="px-10 py-8 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-white/[0.02] transition-all group">
                        <td className="px-10 py-8">
                          <span className="font-mono text-sm text-gold">#{order.id.slice(-8)}</span>
                        </td>
                        <td className="px-10 py-8">
                          <span className="font-serif font-bold">{order.userId.slice(-8)}</span>
                        </td>
                        <td className="px-10 py-8">
                          <span className="text-white/60">{order.items.length} items</span>
                        </td>
                        <td className="px-10 py-8 font-serif font-bold text-xl text-gold">₹{order.total}</td>
                        <td className="px-10 py-8">
                          <span className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                            order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                            order.status === 'preparing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            order.status === 'delivered' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <div className="flex gap-4 justify-end">
                            <button 
                              onClick={() => handleStatusUpdate(order.id, 'preparing')}
                              className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-gold hover:bg-gold/10 transition-all border border-transparent hover:border-gold/20"
                            >
                              <Clock size={18} />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(order.id, 'delivered')}
                              className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-green-400 hover:bg-green-500/10 transition-all border border-transparent hover:border-green-500/20"
                            >
                              <CheckCircle size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-dark rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5"
            >
          <div className="p-10 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/[0.02]">
            <h2 className="text-3xl font-serif font-bold italic">Curated <span className="opacity-40">Artifacts</span></h2>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              {['All', 'Tiffins', 'Lunch', 'Dinner'].map(f => (
                <button key={f} className="px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all">{f}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/[0.01]">
                <tr className="text-left text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">
                  <th className="px-10 py-8">Food Item</th>
                  <th className="px-10 py-8">Classification</th>
                  <th className="px-10 py-8">Value</th>
                  <th className="px-10 py-8">Availability</th>
                  <th className="px-10 py-8 text-right">Manipulation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(items.length > 0 ? items : MENU_ITEMS).map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-all group">
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 group-hover:border-gold/30 transition-colors">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                        </div>
                        <span className="font-serif font-bold text-lg group-hover:text-gold transition-colors">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="bg-white/5 px-4 py-2 rounded-lg text-[10px] font-bold text-white/40 uppercase tracking-widest border border-white/5">{item.category}</span>
                    </td>
                    <td className="px-10 py-8 font-serif font-bold text-xl text-gold">₹{item.price}</td>
                    <td className="px-10 py-8">
                      <span className="flex items-center gap-3 text-gold font-bold text-[10px] uppercase tracking-widest">
                        <CheckCircle size={16} className="text-gold" /> Active Presence
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <div className="flex gap-4 justify-end">
                        <button className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-gold hover:bg-gold/10 transition-all border border-transparent hover:border-gold/20"><Edit3 size={18} /></button>
                        <button className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-accent-red hover:bg-accent-red/10 transition-all border border-transparent hover:border-accent-red/20"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Add Item Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl glass-dark border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h2 className="text-2xl font-serif font-bold italic">New <span className="text-gradient">Artifact</span></h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-all">
                  <X size={24} className="text-white/40" />
                </button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Name</label>
                    <input 
                      type="text" 
                      value={newItem.name}
                      onChange={e => setNewItem({...newItem, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Price</label>
                    <input 
                      type="number" 
                      value={newItem.price}
                      onChange={e => setNewItem({...newItem, price: Number(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Category</label>
                  <select 
                    value={newItem.category}
                    onChange={e => setNewItem({...newItem, category: e.target.value as any})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold/50 transition-all"
                  >
                    {['Tiffins', 'Lunch', 'Dinner', 'Cool Drinks', 'Juices'].map(c => (
                      <option key={c} value={c} className="bg-bg-main text-white">{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Description</label>
                  <textarea 
                    value={newItem.description}
                    onChange={e => setNewItem({...newItem, description: e.target.value})}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold/50 transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gold">Image URL</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={newItem.image}
                      onChange={e => setNewItem({...newItem, image: e.target.value})}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold/50 transition-all"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleAddItem}
                  className="w-full py-4 bg-gold text-black rounded-xl font-bold shadow-xl shadow-gold/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-8"
                >
                  Confirm Entry <CheckCircle size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
