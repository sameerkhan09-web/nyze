import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart, Activity, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import useCartStore from '../store/useCartStore';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/wishlist');
      setWishlist(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wishlist', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (id) => {
    try {
      await api.delete(`/wishlist/${id}`);
      toast.success('Removed from Wishlist');
      fetchWishlist();
    } catch (error) {
      toast.error('Failed to remove');
    }
  };

  const handleAddToCart = (product) => {
    addItem({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      stock: product.stock,
      qty: 1
    });
    toast.success('Added to Cart');
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-12 px-6 cyber-grid min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-black italic text-white uppercase tracking-tighter">Wishlist</h1>
          <div className="flex items-center space-x-3 text-secondary font-black uppercase text-[10px] tracking-[0.4em] animate-pulse">
             <Heart className="w-3 h-3 text-secondary fill-secondary" />
             <span>Favorites // {wishlist.length} Items cached</span>
          </div>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="glass-card p-16 text-center space-y-6 border-white/5 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-20"></div>
           <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-slate-600">
              <Heart className="w-10 h-10" />
           </div>
           <p className="text-slate-400 font-bold uppercase tracking-widest">Neural archive is empty.</p>
           <Link to="/products" className="neon-button-secondary inline-flex px-10 py-4 text-xs">Browse Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <div key={product._id} className="glass-card border-white/5 hover:border-secondary/20 transition-all group relative overflow-hidden flex flex-col">
               <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-60"></div>
                  
                  <button 
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-md rounded-xl text-slate-400 hover:text-red-500 hover:bg-black/60 transition-all border border-white/5"
                  >
                     <Trash2 className="w-5 h-5" />
                  </button>
               </div>

               <div className="p-6 space-y-4 flex-grow flex flex-col">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{product.category}</span>
                     <div className="flex items-center space-x-1 text-primary">
                        <Zap className="w-3 h-3 fill-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest">In Stock</span>
                     </div>
                  </div>
                  
                  <h3 className="text-lg font-black italic text-white uppercase tracking-tighter group-hover:text-secondary transition-colors line-clamp-1">{product.name}</h3>
                  
                  <div className="flex items-end justify-between mt-auto">
                     <span className="text-2xl font-black text-white italic tracking-tighter">₹{product.price}</span>
                     <button 
                       onClick={() => handleAddToCart(product)}
                       className="p-4 bg-secondary text-white rounded-xl shadow-[0_0_20px_rgba(188,19,254,0.3)] hover:shadow-[0_0_30px_rgba(188,19,254,0.5)] hover:scale-110 transition-all"
                     >
                        <ShoppingCart className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
