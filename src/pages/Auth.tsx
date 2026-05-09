import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, UserPlus, Mail, Lock, ChevronRight, Grape as Google, Utensils } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !displayName)) {
      toast.error('Please enter email, password, and full name to create an account.');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    if (isLogin) {
      await signInWithEmail(email, password);
    } else {
      await signUpWithEmail(email, password, displayName);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-bg-main px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 glass-dark rounded-[3rem] shadow-2xl overflow-hidden min-h-[600px] border border-white/5">
        
        {/* Left Side - Visual */}
        <div className="relative hidden lg:block overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=1000" 
            alt="Andhra Veg Meals"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/20 to-transparent" />
          <div className="absolute bottom-16 left-16 text-white z-10">
            <div className="w-16 h-1 bg-gold mb-8"></div>
            <h2 className="text-5xl font-serif font-bold mb-6">Join our<br /><span className="text-gradient">Community</span></h2>
            <p className="text-white/50 max-w-sm mb-10 leading-relaxed italic">
              "Experience the convergence of traditional Andhra spice and modern culinary elegance."
            </p>
            <div className="flex gap-6">
              <div className="glass-dark px-6 py-4 rounded-2xl border border-white/10">
                <p className="text-2xl font-bold text-gold">15k+</p>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30">Members</p>
              </div>
              <div className="glass-dark px-6 py-4 rounded-2xl border border-white/10">
                <p className="text-2xl font-bold text-gold">4.9/5</p>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-white/[0.02]">
          <div className="text-center mb-12">
            <Link to="/" className="inline-flex items-center gap-3 mb-10 group">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center font-bold text-black text-xl shadow-lg shadow-gold/20">V</div>
              <span className="text-2xl font-serif font-bold text-gold tracking-tight">
                Vrindavan <span className="text-white">Cafe</span>
              </span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-white/40 uppercase tracking-widest text-[10px] font-bold">
              {isLogin ? "Enter your credentials" : "Join the spice odyssey"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-14 pr-8 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/20"
                  />
                </div>
                {!isLogin && (
                  <div className="relative group">
                    <LogIn className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                      className="w-full pl-14 pr-8 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/20"
                    />
                  </div>
                )}
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold transition-colors" size={18} />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-14 pr-8 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/20"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button className="text-xs font-bold text-gold/50 hover:text-gold transition-colors tracking-widest uppercase">Forgot Password?</button>
                </div>
              )}

              <button type="submit" className="w-full py-5 bg-gold text-black font-bold rounded-xl shadow-xl shadow-gold/10 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 text-lg">
                {isLogin ? 'Sign In' : 'Create Account'}
                <ChevronRight size={20} />
              </button>

              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 bg-transparent px-4">
                  Signature Login
                </div>
              </div>

              <button 
                onClick={signInWithGoogle}
                className="w-full py-5 bg-white shadow-xl text-black font-bold rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
              >
                <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center">
                  <Google className="text-white" size={14} />
                </div>
                Google Sign In
              </button>
            </motion.form>
          </AnimatePresence>

          <footer className="mt-12 text-center space-y-4">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/30 font-bold uppercase tracking-widest text-[10px]"
            >
              {isLogin ? "Need an account? " : "Already established? "}
              <span className="text-gold hover:underline cursor-pointer">
                {isLogin ? 'Register' : 'Log In'}
              </span>
            </button>
            <Link
              to="/admin-login"
              className="inline-flex w-full justify-center py-4 px-6 bg-gold text-black font-bold rounded-xl shadow-xl shadow-gold/20 hover:bg-yellow-400 transition-all"
            >
              Admin Login
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
