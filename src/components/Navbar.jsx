import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Rocket } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { cartItems } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="sticky top-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto glass-card border-white/5 bg-cyber-black/40 backdrop-blur-2xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-neon-gradient p-2 rounded-xl group-hover:rotate-12 transition-transform duration-500">
             <Rocket className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-black tracking-tighter text-white uppercase italic">
            NY<span className="text-primary neon-text-glow">ZE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-10">
          <Link to="/products" className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Shop All</Link>
          <div className="h-4 w-px bg-white/10"></div>
          <Link to="/products?category=Men" className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Men</Link>
          <Link to="/products?category=Women" className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Women</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-3 text-slate-400 hover:text-primary transition-colors rounded-xl hover:bg-white/5">
            <Search className="w-5 h-5" />
          </button>
          
          <Link to="/cart" className="p-3 text-slate-400 hover:text-primary transition-colors rounded-xl hover:bg-white/5 relative group">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 bg-primary text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-[0_0_10px_rgba(0,242,255,0.5)]">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center space-x-6">
              <div className="hidden lg:flex items-center space-x-6">
                 <Link to="/wishlist" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-secondary transition-colors">Wishlist</Link>
                 <Link to="/orders" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Orders</Link>
              </div>
              
              <Link to={user.role === 'admin' ? '/admin' : '/orders'} className="p-3 text-slate-400 hover:text-primary transition-colors rounded-xl hover:bg-white/5 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary p-px">
                  <div className="w-full h-full rounded-full bg-cyber-black flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>
                <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">{user.name.split(' ')[0]}</span>
              </Link>
              <button 
                onClick={logout}
                className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="neon-button-primary py-2 px-6 text-sm">
               Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-3 text-slate-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay (Simplified) */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-cyber-black/90 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
           <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white"><X className="w-8 h-8"/></button>
           <Link onClick={() => setIsMenuOpen(false)} to="/products" className="text-3xl font-black italic hover:text-primary">SHOP ALL</Link>
           <Link onClick={() => setIsMenuOpen(false)} to="/products?category=Men" className="text-3xl font-black italic hover:text-primary">MEN</Link>
           <Link onClick={() => setIsMenuOpen(false)} to="/products?category=Women" className="text-3xl font-black italic hover:text-primary">WOMEN</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
