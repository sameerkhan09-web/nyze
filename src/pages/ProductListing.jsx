import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Cpu, SlidersHorizontal, ChevronDown } from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [categoryParam, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/products', {
        params: {
          category: categoryParam || '',
          keyword: searchQuery || '',
        },
      });
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products', error);
      setLoading(false);
    }
  };

  const categories = ['All', 'Men', 'Women', 'Kids', 'Accessories', 'Shoes'];

  return (
    <div className="space-y-12 pb-20 cyber-grid min-h-screen pt-8">
      {/* Header */}
      <section className="container mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter">
              {categoryParam ? categoryParam : 'All Products'}
            </h1>
            <div className="flex items-center space-x-2 text-primary font-black uppercase text-[10px] tracking-[0.3em]">
              <Cpu className="w-3 h-3" />
              <span>Found {products.length} items</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 max-w-md w-full">
            <div className="relative flex-grow group">
              <input
                type="text"
                placeholder="Search..."
                className="neon-input w-full pl-12 group-focus-within:border-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-10">
          <div className="glass-card p-8 space-y-8 sticky top-28 border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="font-black italic text-white uppercase tracking-widest text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary" />
                Filters
              </h3>
              <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Clear</button>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Category</h4>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${(categoryParam || 'All') === cat
                        ? 'bg-primary text-black border-primary shadow-[0_0_15px_rgba(0,242,255,0.3)]'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:border-primary/50'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Price Range</h4>
                <div className="space-y-2">
                  <input type="range" className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary" />
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <span>₹0</span>
                    <span>₹1000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <button className="neon-button-primary w-full text-xs py-4">Apply</button>
            </div>
          </div>
        </aside>

        {/* Main Grid */}
        <main className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="glass-card h-[450px] animate-pulse bg-white/5"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-40 text-center space-y-6">
              <Cpu className="w-20 h-20 text-slate-800 mx-auto animate-pulse" />
              <h3 className="text-2xl font-black italic text-slate-700 uppercase tracking-[0.3em]">No units matching criteria</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

export default ProductListing;
