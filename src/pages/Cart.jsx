import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, Cpu, Zap } from 'lucide-react';
import useCartStore from '../store/useCartStore';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  const handleQtyChange = (item, newQty) => {
    if (newQty < 1) return;
    if (newQty > item.stock) return;
    addToCart(item, newQty);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-40 space-y-12 cyber-grid">
        <div className="bg-white/5 w-32 h-32 rounded-full flex items-center justify-center mx-auto border border-white/5 relative overflow-hidden">
          <ShoppingBag className="w-12 h-12 text-slate-700" />
          <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter">CART IS EMPTY</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm">Your cart is empty. Please add some items to shop.</p>
        </div>
        <Link 
          to="/products"
          className="neon-button-primary inline-flex px-12 py-5 uppercase italic tracking-[0.2em]"
        >
          <span>Start Shopping</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-12 cyber-grid min-h-screen px-6">
      <div className="flex items-end space-x-6">
         <h1 className="text-6xl font-black italic text-white uppercase tracking-tighter">Your Cart</h1>
         <div className="h-10 w-px bg-white/10 hidden md:block"></div>
         <span className="text-primary font-black uppercase tracking-[0.4em] text-xs pb-2 animate-pulse">{cartItems.length} ITEMS</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.product} className="glass-card p-8 border-white/5 flex flex-col md:flex-row items-center gap-10 group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-20 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="w-40 h-52 rounded-2xl overflow-hidden border border-white/5 flex-shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/60 to-transparent"></div>
              </div>

              <div className="flex-grow space-y-6 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1 block">{item.category}</span>
                    <h3 className="text-2xl font-black italic text-white uppercase group-hover:text-primary transition-colors">{item.name}</h3>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product)}
                    className="p-3 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Qty Controls */}
                  <div className="flex items-center glass-card border-white/10 rounded-2xl overflow-hidden">
                    <button 
                      onClick={() => handleQtyChange(item, item.qty - 1)}
                      className="px-6 py-3 hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 font-black text-white italic w-12 text-center text-lg">{item.qty}</span>
                    <button 
                      onClick={() => handleQtyChange(item, item.qty + 1)}
                      className="px-6 py-3 hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-white italic tracking-tighter">₹{(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-8">
          <div className="glass-card p-10 space-y-10 sticky top-28 border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-center space-x-3 text-primary">
               <Cpu className="w-6 h-6" />
               <h2 className="text-2xl font-black italic text-white uppercase tracking-widest">Order Summary</h2>
            </div>
            
            <div className="space-y-6">
               <div className="flex justify-between text-xs font-black text-slate-500 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-300">₹{getCartTotal()}</span>
               </div>
               <div className="flex justify-between text-xs font-black text-slate-500 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-accent">FREE</span>
               </div>
               <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-sm font-black text-white uppercase tracking-[0.2em]">Total</span>
                  <span className="text-4xl font-black text-primary italic tracking-tighter neon-text-glow">₹{getCartTotal()}</span>
               </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="neon-button-primary w-full py-6 uppercase italic tracking-[0.3em] group shadow-[0_0_20px_rgba(0,242,255,0.2)]"
            >
              <span>Checkout</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="flex items-center justify-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest animate-pulse">
               <Zap className="w-4 h-4 text-accent" />
               <span>Fast Processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
