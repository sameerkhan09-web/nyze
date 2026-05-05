import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ArrowLeft, Upload, Save, Cpu, Zap, Box } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: 'Men',
    stock: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/products', formData);
      toast.success('Product Added Successfully', {
        style: {
          background: '#020617',
          color: '#00F2FF',
          border: '1px solid rgba(0, 242, 255, 0.2)',
          borderRadius: '16px',
        }
      });
      navigate('/admin/products');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-500 max-w-4xl mx-auto">
      <button 
        onClick={() => navigate('/admin/products')}
        className="flex items-center space-x-2 text-slate-400 hover:text-primary transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-black uppercase tracking-widest italic">Back to Products</span>
      </button>

      <div className="space-y-2">
        <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">New Entry</h2>
        <div className="flex items-center space-x-3 text-primary font-black uppercase text-[10px] tracking-[0.3em] animate-pulse">
           <Cpu className="w-3 h-3" />
           <span>Injecting new data unit</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2 glass-card p-10 space-y-8 border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
           <div className="flex items-center space-x-4 border-b border-white/5 pb-6">
              <Box className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-black italic text-white uppercase tracking-widest">General Information</h3>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Product Name</label>
                <input
                  required
                  className="neon-input w-full"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter unit name"
                />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Price (₹)</label>
                <input
                  required
                  type="number"
                  className="neon-input w-full"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Initial Stock</label>
                <input
                  required
                  type="number"
                  className="neon-input w-full"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="Quantity"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Category</label>
                <select
                  className="neon-input w-full appearance-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Image URL</label>
                <div className="relative group">
                  <input
                    required
                    className="neon-input w-full pl-12"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://image-link.com"
                  />
                  <Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 group-focus-within:text-primary transition-colors" />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Description</label>
                <textarea
                  required
                  rows="4"
                  className="neon-input w-full resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the unit specs..."
                ></textarea>
              </div>
           </div>

           <div className="pt-6 border-t border-white/5 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="neon-button-primary px-12 py-5 uppercase italic tracking-widest group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Initialize Data</span>
                  </>
                )}
              </button>
           </div>
        </div>
      </form>

      {/* Preview Card */}
      <div className="space-y-6">
         <div className="flex items-center space-x-3 text-secondary font-black uppercase text-[10px] tracking-[0.3em]">
            <Zap className="w-3 h-3" />
            <span>Real-time Preview</span>
         </div>
         <div className="glass-card p-8 border-white/5 flex items-center space-x-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
               {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <Package className="w-8 h-8 text-slate-700" />}
            </div>
            <div>
               <h4 className="text-xl font-black italic text-white uppercase">{formData.name || 'Unit Alpha'}</h4>
               <p className="text-primary font-black text-2xl italic mt-1">₹{formData.price || '0.00'}</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
