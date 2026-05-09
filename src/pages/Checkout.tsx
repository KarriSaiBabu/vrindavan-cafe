import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Wallet, Truck, CheckCircle2, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { dbService } from '../services/db';
import { toast } from 'react-hot-toast';

export function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    phone: '',
    address: ''
  });
  const navigate = useNavigate();

  const handleOrderPlace = async () => {
    if (!user) {
      toast.error('Please sign in to place an order');
      navigate('/auth');
      return;
    }

    if (!deliveryInfo.address || !deliveryInfo.phone) {
      toast.error('Please provide delivery details');
      setStep(1);
      return;
    }

    setIsProcessing(true);
    try {
      // Create admin account if it doesn't exist
      await dbService.createAdminAccount();
      
      // Place the order
      const orderId = await dbService.placeOrder({
        userId: user.uid,
        items: cart,
        total: totalPrice,
        deliveryAddress: deliveryInfo.address,
        paymentMethod: paymentMethod,
        status: 'pending'
      });

      // Send order notification to admin
      if (orderId) {
        const orderData = {
          id: orderId,
          userId: user.uid,
          items: cart,
          total: totalPrice,
          status: 'pending' as const,
          createdAt: Date.now(),
          deliveryAddress: deliveryInfo.address,
          paymentMethod: paymentMethod
        };
        await dbService.sendOrderNotification(orderData);
      }
      
      setIsProcessing(false);
      setStep(3);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      setIsProcessing(false);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const PaymentOption = ({ id, label, icon: Icon }: any) => (
    <button 
      onClick={() => setPaymentMethod(id)}
      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all w-full text-left ${
        paymentMethod === id ? 'border-gold bg-gold/5' : 'border-white/5 bg-white/[0.02]'
      }`}
    >
      <div className={`p-4 rounded-xl ${paymentMethod === id ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'bg-white/5 text-white/50'}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className={`font-serif font-bold text-lg ${paymentMethod === id ? 'text-gold' : 'text-white'}`}>{label}</p>
        <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">Secure Encryption</p>
      </div>
      {paymentMethod === id && (
        <div className="ml-auto">
          <CheckCircle2 size={24} className="text-gold" />
        </div>
      )}
    </button>
  );

  return (
    <div className="pt-32 pb-20 bg-bg-main min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-16 relative px-8">
           <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/5 z-0 mx-16" />
           {[1, 2, 3].map((s) => (
             <div 
                key={s} 
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm relative z-10 transition-all duration-500 border-2 ${
                  step >= s ? 'bg-gold text-black border-gold shadow-lg shadow-gold/20 scale-110' : 'bg-bg-main text-white/20 border-white/10'
                }`}
              >
               {s}
             </div>
           ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-dark p-10 rounded-[2.5rem] shadow-2xl border border-white/5">
            <h2 className="text-3xl font-serif font-bold mb-10 text-white italic">Delivery <span className="text-gradient">Details</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold px-2">First Name</label>
                <input 
                  type="text" 
                  value={deliveryInfo.firstName}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, firstName: e.target.value })}
                  className="w-full px-6 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/20" 
                  placeholder="John" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold px-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={deliveryInfo.phone}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                  className="w-full px-6 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/20" 
                  placeholder="+91 9374567746" 
                />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold px-2">Delivery Address</label>
                <textarea 
                  rows={3} 
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                  className="w-full px-6 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/20 resize-none" 
                  placeholder="House No, Street, Locality, City, PIN" 
                />
              </div>
            </div>
            <button 
              onClick={() => setStep(2)}
              className="mt-12 w-full py-6 bg-gold text-black rounded-xl font-bold shadow-xl shadow-gold/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-lg"
            >
              Continue to Payment <ArrowRight size={20} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 glass-dark p-10 rounded-[2.5rem] shadow-2xl border border-white/5">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-serif font-bold italic">Payment <span className="opacity-50">Methods</span></h2>
                <span className="flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-widest opacity-60">
                  <ShieldCheck size={16} /> Secure Verification
                </span>
              </div>

              <div className="space-y-5">
                <PaymentOption id="upi" label="UPI Signature" icon={Wallet} />
                <PaymentOption id="card" label="Credit / Debit Platinum" icon={CreditCard} />
                <PaymentOption id="cod" label="Authentic Cash Collection" icon={Truck} />
              </div>
              
              <button 
                 onClick={() => setStep(1)}
                 className="mt-10 text-white/30 font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 hover:text-gold transition-colors"
              >
                <ArrowLeft size={16} /> Edit Delivery Information
              </button>
            </div>

            <div className="lg:col-span-1 glass-dark p-8 rounded-[2.5rem] shadow-2xl border border-white/5 h-fit sticky top-32">
              <h2 className="text-xl font-serif font-bold mb-8 border-b border-white/5 pb-4">Payment Summary</h2>
              <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Order Total</span>
                  <span className="font-serif font-bold text-xl">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between items-center text-white/30">
                   <span className="text-xs font-bold uppercase tracking-widest">GST (5%)</span>
                   <span>₹{Math.round(totalPrice * 0.05)}</span>
                </div>
                <div className="border-t border-white/10 pt-6 flex justify-between items-center text-2xl font-serif font-bold text-gold">
                  <span>Grand Total</span>
                  <span className="text-gradient">₹{totalPrice + Math.round(totalPrice * 0.05)}</span>
                </div>
              </div>
              <button 
                 onClick={handleOrderPlace}
                 disabled={isProcessing}
                 className="w-full py-6 bg-gold text-black rounded-xl font-bold shadow-xl shadow-gold/20 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
              >
                {isProcessing ? 'Authenticating...' : 'Complete Payment'}
                {!isProcessing && <ArrowRight size={20} />}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24 px-10 glass-dark rounded-[3rem] shadow-2xl border border-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gold opacity-5 blur-[100px] rounded-full pointer-events-none" />
             <div className="w-24 h-24 bg-gold shadow-2xl shadow-gold/20 rounded-full flex items-center justify-center mx-auto mb-10 text-black">
                <CheckCircle2 size={56} />
             </div>
             <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white italic">Signature Order <span className="text-gradient">Successful!</span></h1>
             <p className="text-white/40 mb-12 max-w-md mx-auto text-lg leading-relaxed">Your delicious Andhra meal is being prepared with legacy spices. Reference: <span className="font-bold text-gold">#VRN-98231</span>.</p>
             <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
               <Link to="/profile" className="px-12 py-5 bg-gold text-black font-bold rounded-xl shadow-2xl shadow-gold/10 hover:scale-105 transition-transform active:scale-95">
                 Track Journey
               </Link>
               <Link to="/" className="px-12 py-5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all active:scale-95">
                 Back to Home
               </Link>
             </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
