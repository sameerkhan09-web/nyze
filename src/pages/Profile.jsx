import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import { User, Mail, Shield, Zap, Activity, Cpu, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 cyber-grid min-h-screen">
      <div className="glass-card p-12 border-white/5 relative overflow-hidden space-y-12">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
             <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all"></div>
             <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent p-1 relative z-10">
                <div className="w-full h-full rounded-full bg-cyber-black flex items-center justify-center overflow-hidden">
                   <User className="w-16 h-16 text-white" />
                </div>
             </div>
             <div className="absolute -bottom-2 -right-2 bg-accent text-black p-2 rounded-lg z-20 shadow-[0_0_15px_#39FF14]">
                <Shield className="w-4 h-4" />
             </div>
          </div>

          <div className="text-center md:text-left space-y-2">
             <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter">{user.name}</h1>
             <div className="flex items-center justify-center md:justify-start space-x-3 text-primary font-black uppercase text-[10px] tracking-[0.4em]">
                <Activity className="w-3 h-3" />
                <span>Account Status: Verified // {user.role}</span>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="glass-card p-6 border-white/5 bg-white/5 flex flex-col items-center space-y-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Orders</span>
              <span className="text-2xl font-black text-white italic">12</span>
           </div>
           <div className="glass-card p-6 border-white/5 bg-white/5 flex flex-col items-center space-y-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Wishlist</span>
              <span className="text-2xl font-black text-secondary italic">5</span>
           </div>
           <div className="glass-card p-6 border-white/5 bg-white/5 flex flex-col items-center space-y-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Credits</span>
              <span className="text-2xl font-black text-accent italic">450</span>
           </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
           <div className="flex items-center space-x-6 p-6 glass-card border-white/5 hover:border-primary/20 transition-all">
              <div className="bg-primary/10 p-4 rounded-xl text-primary">
                 <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</p>
                 <p className="text-lg font-bold text-white">{user.email}</p>
              </div>
           </div>

           <div className="flex items-center space-x-6 p-6 glass-card border-white/5 hover:border-secondary/20 transition-all">
              <div className="bg-secondary/10 p-4 rounded-xl text-secondary">
                 <Zap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Member Since</p>
                 <p className="text-lg font-bold text-white">MAY 2026</p>
              </div>
           </div>
        </div>

        <button 
          onClick={logout}
          className="w-full flex items-center justify-center space-x-3 py-5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl font-black uppercase italic tracking-[0.3em] hover:bg-red-500 hover:text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.1)]"
        >
           <LogOut className="w-5 h-5" />
           <span>Terminate Session</span>
        </button>

        <div className="flex items-center justify-center space-x-3 text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">
           <Cpu className="w-4 h-4" />
           <span>Neural Identity Core v4.0.2</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
