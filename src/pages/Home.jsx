import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Cpu, Box } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useState, useEffect } from 'react';
import api from '../services/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setFeaturedProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'Men', icon: Cpu, desc: 'Quality Menswear', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000' },
    { name: 'Women', icon: Zap, desc: 'Modern Style', img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1000' },
    { name: 'Kids', icon: Shield, desc: 'For Everyone', img: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=1000' },
    { name: 'Accessories', icon: Box, desc: 'Best Addons', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000' },
  ];

  return (
    <div className="space-y-32 pb-20 cyber-grid min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-float"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center space-y-10">
          <div className="space-y-4">
             <span className="text-primary font-black uppercase tracking-[0.4em] text-xs animate-pulse">Welcome to Nyze</span>
             <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase leading-none">
                STYLE <span className="text-transparent bg-clip-text bg-neon-gradient italic">FOR YOU</span>
             </h1>
             <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium tracking-wide">
                Discover the best clothes and accessories. Premium quality designed for everyone.
             </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/products" className="neon-button-primary text-lg px-12 py-5 uppercase italic tracking-widest">
              Shop Now
              <ArrowRight className="w-6 h-6" />
            </Link>
            <button className="glass-card px-12 py-5 font-bold uppercase tracking-widest text-white hover:bg-white/10">
               About Us
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className="group relative h-96 overflow-hidden rounded-3xl glass-card border-white/5"
            >
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 space-y-2">
                <cat.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-3xl font-black italic text-white uppercase">{cat.name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 space-y-12">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-4xl font-black italic text-white uppercase">New Arrivals</h2>
            <div className="h-1 w-24 bg-primary shadow-[0_0_10px_#00F2FF]"></div>
          </div>
          <Link to="/products" className="text-primary font-bold uppercase text-xs tracking-widest hover:underline">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Futuristic Banner */}
      <section className="container mx-auto px-6">
         <div className="glass-card p-12 lg:p-24 relative overflow-hidden flex flex-col items-center text-center space-y-8">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50"></div>
            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase max-w-4xl">
               Join our club. <span className="text-primary">20% Off</span> Your First Order.
            </h2>
            <div className="flex bg-white/5 p-2 rounded-2xl border border-white/10 max-w-md w-full focus-within:border-primary transition-all">
               <input type="email" placeholder="YOUR@EMAIL.COM" className="bg-transparent border-none outline-none flex-grow px-6 text-sm font-bold uppercase tracking-widest text-white" />
               <button className="bg-primary text-black px-8 py-3 rounded-xl font-bold uppercase text-xs hover:bg-primary-hover transition-all">Join</button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
