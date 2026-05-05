import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Plus } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`, {
      style: {
        background: '#0F172A',
        color: '#00F2FF',
        border: '1px solid rgba(0, 242, 255, 0.2)',
        borderRadius: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: '12px',
        letterSpacing: '0.1em'
      }
    });
  };

  return (
    <div className="group relative glass-card border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,242,255,0.1)]">
      {/* Category Tag */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-cyber-black/60 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border border-primary/20">
          {product.category}
        </span>
      </div>

      {/* Image Container */}
      <Link to={`/product/${product._id}`} className="block relative h-80 overflow-hidden rounded-t-3xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-60"></div>
        
        {/* Quick Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button className="bg-white text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
              <Plus className="w-6 h-6" />
           </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product._id}`}>
            <h3 className="text-xl font-black italic text-white uppercase group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
          </Link>
          <button className="text-slate-400 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between">
           <span className="text-2xl font-black text-white italic tracking-tighter">
             ₹{product.price.toFixed(2)}
           </span>
           <button 
             onClick={handleAddToCart}
             className="bg-primary/10 hover:bg-primary text-primary hover:text-black p-3 rounded-2xl border border-primary/30 transition-all group/btn"
           >
             <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
           </button>
        </div>
      </div>
      
      {/* Bottom Glow Line */}
      <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-700 absolute bottom-0 left-0"></div>
    </div>
  );
};

export default ProductCard;
