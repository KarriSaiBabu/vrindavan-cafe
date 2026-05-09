import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Namaskaram! We have received your message. Our team will contact you shortly.');
  };

  return (
    <div className="pt-32 pb-20 bg-bg-main min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 px-4 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold opacity-5 blur-[100px] rounded-full pointer-events-none" />
          <span className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-6 block">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Contact <span className="text-gradient italic">Us</span></h1>
          <p className="text-white/50 max-w-2xl mx-auto italic text-lg leading-relaxed">
            "Have a question about our spices, or want to book a table for a traditional feast? We're here to help you."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: MapPin, title: 'Visit Us', text: 'Simhachalam, Visakhapatnam, Andhra Pradesh 530028' },
                { icon: Phone, title: 'Call Us', text: '+91 9374567746' },
                { icon: Mail, title: 'Email Us', text: 'hello@vrindavancafe.com' },
                { icon: MessageCircle, title: 'WhatsApp', text: '+91 9374567746' },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-dark p-8 rounded-[2rem] border border-white/5 shadow-2xl group hover:border-gold/30 transition-all"
                >
                  <div className="w-14 h-14 bg-white/5 text-gold rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-black transition-all shadow-lg border border-white/10">
                    <item.icon size={28} />
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-3 text-white group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="glass-dark rounded-[2.5rem] border border-white/5 relative overflow-hidden h-[350px] shadow-2xl">
               <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group">
                       <MapPin size={40} className="text-gold animate-bounce" />
                    </div>
                    <p className="font-serif font-bold text-2xl mb-2">Find us on the map</p>
                    <p className="text-white/30 text-sm tracking-widest uppercase font-bold">Simhachalam, Visakhapatnam</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass-dark p-10 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/5 relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Send size={150} />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-10 text-white leading-tight">Send us a <span className="italic opacity-50">Message</span></h2>
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold pl-1">Full Name</label>
                   <input required type="text" className="w-full px-6 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/10" placeholder="John Doe" />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold pl-1">Email Address</label>
                   <input required type="email" className="w-full px-6 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/10" placeholder="john@example.com" />
                 </div>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold pl-1">Subject</label>
                 <select className="w-full px-6 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 transition-all text-white appearance-none cursor-pointer">
                    <option className="bg-bg-main">General Inquiry</option>
                    <option className="bg-bg-main">Table Reservation</option>
                    <option className="bg-bg-main">Catering Request</option>
                    <option className="bg-bg-main">Feedback</option>
                 </select>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold pl-1">Message</label>
                 <textarea required rows={5} className="w-full px-6 py-5 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-gold/50 transition-all text-white placeholder:text-white/10 resize-none" placeholder="Tell us how we can help you..." />
              </div>
              <button 
                 type="submit"
                 className="w-full py-6 bg-gold text-black font-bold rounded-xl shadow-xl hover:scale-[1.02] shadow-gold/20 transition-all active:scale-95 flex items-center justify-center gap-3 group text-lg"
              >
                Submit Message
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
