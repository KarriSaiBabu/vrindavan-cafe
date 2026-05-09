import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const ADMIN_EMAIL = 'saibabukarri@gmail.com';
const ADMIN_PASSWORD = '123456789';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signInWithEmail, signInAsStaticAdmin, user, profile, isStaticAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isStaticAdmin || (user && profile?.role === 'admin')) {
      navigate('/admin');
    }
  }, [user, profile, isStaticAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter admin email and password.');
      return;
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const success = await signInAsStaticAdmin(email, password);
      if (success) {
        navigate('/admin');
      }
      return;
    }

    const success = await signInWithEmail(email, password);
    if (success) {
      if (profile?.role !== 'admin' && !isStaticAdmin) {
        toast.error('Authenticated, but admin access is required.');
        navigate('/');
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-bg-main px-4">
      <div className="max-w-4xl w-full glass-dark rounded-[3rem] shadow-2xl overflow-hidden border border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-10 bg-gradient-to-br from-black/80 to-bg-main/80 text-white">
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.4em] text-gold font-bold">Administrator Access</p>
              <h1 className="text-4xl font-serif font-bold mt-6">Admin Login</h1>
              <p className="text-white/40 mt-4 leading-relaxed">Use the credentials below to access the admin console and manage orders.</p>
            </div>
            <div className="space-y-5 bg-white/5 p-6 rounded-3xl border border-white/10 shadow-lg shadow-black/20">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Admin Access</p>
                <p className="mt-2 text-lg font-bold text-white">Enter your admin credentials to sign in and manage orders.</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Security</p>
                <p className="mt-2 text-sm text-white/60">If you do not have admin access, please contact the site owner.</p>
              </div>
            </div>
            <Link to="/auth" className="inline-flex items-center gap-2 mt-12 text-white/70 hover:text-white transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to user login
            </Link>
          </div>

          <div className="p-10">
            <div className="mb-10">
              <h2 className="text-3xl font-serif font-bold text-white">Secure Admin Entry</h2>
              <p className="text-white/40 mt-3">Login with the admin credentials to view and manage orders on the admin dashboard.</p>
            </div>

            <motion.form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="email"
                    placeholder="Admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-8 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 text-white placeholder:text-white/30"
                    required
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-14 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 text-white placeholder:text-white/30"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-gold text-black font-bold rounded-xl shadow-xl shadow-gold/10 flex items-center justify-center gap-3 text-lg">
                Enter Admin Page
                <ChevronRight size={20} />
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
