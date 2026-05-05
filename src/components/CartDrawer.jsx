import { X, ShoppingBag, ArrowRight, Minus, Plus, Trash2, Cpu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import useCartStore from '../store/useCartStore';

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, addToCart, getCartTotal } = useCartStore();

  const handleQtyChange = (item, newQty) => {
    if (newQty < 1) return;
    if (newQty > item.stock) return;
    addToCart(item, newQty);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-cyber-black/80 backdrop-blur-3xl z-[110] border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full relative overflow-hidden">
          {/* Top Scanner Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-neon-gradient opacity-50"></div>

          {/* Header */}
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
             <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-2 rounded-xl text-primary">
                   <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-black italic text-white uppercase tracking-widest">Cart Items</h3>
                   <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] animate-pulse">{cartItems.length} Added</span>
                </div>
             </div>
             <button onClick={onClose} className="p-3 text-slate-400 hover:text-white transition-colors">
                <X className="w-8 h-8" />
             </button>
          </div>

          {/* Items */}
          <div className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20 py-20">
                 <Cpu className="w-16 h-16 text-primary" />
                 <p className="text-xs font-black uppercase tracking-[0.4em] text-primary">Cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product} className="glass-card p-6 border-white/5 flex items-center space-x-6 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="w-24 h-32 rounded-xl overflow-hidden border border-white/5 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow space-y-3">
                    <div className="flex justify-between items-start">
                       <h4 className="text-xs font-black italic text-white uppercase tracking-widest group-hover:text-primary transition-colors line-clamp-1">{item.name}</h4>
                       <button onClick={() => removeFromCart(item.product)} className="text-slate-600 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center glass-card border-white/10 rounded-xl overflow-hidden">
                          <button onClick={() => handleQtyChange(item, item.qty - 1)} className="px-3 py-1 hover:bg-white/5 text-slate-400"><Minus className="w-3 h-3" /></button>
                          <span className="px-3 text-xs font-black text-white italic">{item.qty}</span>
                          <button onClick={() => handleQtyChange(item, item.qty + 1)} className="px-3 py-1 hover:bg-white/5 text-slate-400"><Plus className="w-3 h-3" /></button>
                       </div>
                       <span className="text-sm font-black text-white italic">₹{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-8 bg-white/5 border-t border-white/5 space-y-6">
            <div className="flex items-center justify-between">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total</span>
               <span className="text-3xl font-black text-primary italic tracking-tighter neon-text-glow">₹{getCartTotal()}</span>
            </div>
            <button 
              className="neon-button-primary w-full py-5 uppercase italic tracking-[0.3em] group"
              onClick={() => { onClose(); navigate('/checkout'); }}
            >
              <span>Checkout</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <Link 
              to="/cart" 
              onClick={onClose}
              className="block text-center text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
