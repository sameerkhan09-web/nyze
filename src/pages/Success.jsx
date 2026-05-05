import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package, ShoppingBag } from 'lucide-react';

const Success = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-6 cyber-grid relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-2xl w-full glass-card p-12 text-center space-y-10 relative z-10 border-white/5 shadow-[0_0_50px_rgba(0,242,255,0.1)]">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
          <div className="bg-primary text-black w-24 h-24 rounded-full flex items-center justify-center relative z-10 shadow-[0_0_30px_#00F2FF]">
             <CheckCircle className="w-12 h-12" />
          </div>
        </div>

        <div className="space-y-4">
           <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter">Order Success</h1>
           <div className="h-1 w-24 bg-primary mx-auto shadow-[0_0_10px_#00F2FF]"></div>
           <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-md mx-auto">
             Your order has been placed successfully. Our team is preparing your package for fast shipping.
           </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
           <div className="glass-card p-6 border-white/5 flex flex-col items-center space-y-4 hover:border-primary/30 transition-all cursor-pointer group">
              <Package className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Track Order</span>
           </div>
           <div className="glass-card p-6 border-white/5 flex flex-col items-center space-y-4 hover:border-secondary/30 transition-all cursor-pointer group">
              <ShoppingBag className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Shop More</span>
           </div>
        </div>

        <div className="pt-8">
           <Link 
             to="/"
             className="neon-button-primary w-full py-5 text-sm uppercase italic tracking-[0.3em] group"
           >
             <span>Back to Home</span>
             <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
           </Link>
        </div>
      </div>

      {/* Decorative Text */}
      <div className="absolute bottom-10 left-10 text-[8px] font-black text-slate-800 uppercase tracking-[0.5em] hidden lg:block">
         NYZE // TRANSACTION_COMPLETE // STATUS_STABLE
      </div>
    </div>
  );
};

export default Success;
