import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Filter, Cpu, Zap, Activity } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products', error);
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product Deleted', {
          style: {
            background: '#020617',
            color: '#F43F5E',
            border: '1px solid rgba(244, 63, 94, 0.2)',
            borderRadius: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '12px',
            letterSpacing: '0.1em'
          }
        });
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">Products</h2>
          <div className="flex items-center space-x-3 text-primary font-black uppercase text-[10px] tracking-[0.3em] animate-pulse">
             <Activity className="w-3 h-3" />
             <span>Total: {products.length}</span>
          </div>
        </div>
        <Link to="/admin/products/add" className="neon-button-primary uppercase italic tracking-widest text-xs px-10 py-5 group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>Add New Product</span>
        </Link>
      </div>

      <div className="glass-card border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.4)] relative overflow-hidden">
        {/* Top Scanner Line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
        
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5">
           <div className="relative max-w-md w-full group">
              <input 
                type="text" 
                placeholder="Search..." 
                className="neon-input w-full pl-12 group-focus-within:border-primary" 
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
           </div>
           <div className="flex items-center space-x-4">
              <button className="glass-card p-4 text-slate-400 hover:text-primary border-white/10">
                 <Filter className="w-5 h-5" />
              </button>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
                 <button className="bg-primary text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase italic tracking-widest shadow-[0_0_15px_rgba(0,242,255,0.3)]">Active</button>
                 <button className="text-slate-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase italic tracking-widest hover:text-white transition-colors">Disabled</button>
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                <th className="px-10 py-6 italic">Product</th>
                <th className="px-10 py-6 italic">Category</th>
                <th className="px-10 py-6 italic">Price</th>
                <th className="px-10 py-6 italic">Stock</th>
                <th className="px-10 py-6 italic text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/5 group-hover:border-primary transition-colors">
                        <img src={product.image} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-40"></div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-black italic text-white uppercase tracking-widest group-hover:text-primary transition-colors">{product.name}</span>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ID: {product._id.slice(-6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="bg-white/5 text-slate-400 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:text-primary group-hover:border-primary/30 transition-all">
                       {product.category}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                      <span className="text-xl font-black italic text-white tracking-tighter">₹{product.price}</span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="space-y-2">
                       <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
                          <span className={product.stock < 10 ? 'text-red-500' : 'text-slate-500'}>{product.stock < 10 ? 'Low Stock' : 'In Stock'}</span>
                          <span className="text-white">{product.stock} units</span>
                       </div>
                       <div className="w-32 bg-white/5 h-1 rounded-full overflow-hidden">
                          <div 
                             className={`h-full transition-all duration-1000 ${product.stock < 10 ? 'bg-red-500 shadow-[0_0_10px_#F43F5E]' : 'bg-primary shadow-[0_0_10px_#00F2FF]'}`}
                             style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                          ></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center justify-center space-x-3">
                      <button className="p-3 bg-white/5 text-blue-400 border border-white/5 hover:border-blue-400/50 hover:bg-blue-400/10 rounded-xl transition-all"><Edit className="w-5 h-5" /></button>
                      <button 
                        onClick={() => deleteHandler(product._id)}
                        className="p-3 bg-white/5 text-red-500 border border-white/5 hover:border-red-500/50 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
