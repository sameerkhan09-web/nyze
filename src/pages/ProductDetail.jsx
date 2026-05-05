import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, ShieldCheck, Zap, Truck, RotateCcw } from 'lucide-react';
import api from '../services/api';
import useCartStore from '../store/useCartStore';
import { toast } from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart', {
      style: {
        background: '#020617',
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

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(0,242,255,0.5)]"></div></div>;
  if (!product) return <div className="text-center py-40 text-4xl font-black italic uppercase text-red-500">Unit Offline</div>;

  return (
    <div className="container mx-auto px-6 py-12 cyber-grid min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-12 flex items-center space-x-2 text-slate-400 hover:text-primary transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest italic">Go Back</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Product Image */}
        <div className="space-y-6">
          <div className="glass-card rounded-[40px] overflow-hidden border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative aspect-[4/5] group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/60 to-transparent"></div>

            {/* Image Overlay HUD */}
            <div className="absolute top-8 left-8 space-y-2">
              <span className="bg-primary text-black text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-xl">Product ID: {product._id.slice(-6)}</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-10">
          <div className="space-y-4">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs animate-pulse">{product.category}</span>
            <h1 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center space-x-6">
              <span className="text-4xl font-black text-white italic tracking-tighter">₹{product.price.toFixed(2)}</span>
              <div className="h-8 w-px bg-white/10"></div>
              <div className="flex items-center space-x-2 text-accent font-black text-xs uppercase tracking-widest">
                <Zap className="w-4 h-4" />
                <span>{product.stock} items left</span>
              </div>
            </div>
          </div>

          <p className="text-slate-400 text-lg font-medium leading-relaxed tracking-wide border-l-4 border-primary/20 pl-8">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <button
              onClick={handleAddToCart}
              className="neon-button-primary flex-grow text-lg py-5 uppercase italic tracking-[0.2em]"
            >
              <ShoppingCart className="w-6 h-6" />
              Add to Cart
            </button>
            <button className="glass-card px-8 py-5 text-white hover:bg-white/10 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Specs / Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/5">
            {[
              { icon: Truck, title: 'Fast Shipping', desc: 'Ships globally' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: 'Safe transactions' },
              { icon: Zap, title: 'Premium Quality', desc: 'Best materials' }
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4 p-4 glass-card border-white/5 hover:border-white/10 transition-colors">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-black italic text-white uppercase tracking-widest">{item.title}</h5>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
