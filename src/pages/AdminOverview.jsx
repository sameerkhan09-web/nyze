import { useState, useEffect } from 'react';
import { IndianRupee, ShoppingCart, Package, TrendingUp, Cpu, Activity, Zap } from 'lucide-react';
import api from '../services/api';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: orders } = await api.get('/orders');
        const { data: products } = await api.get('/products');
        
        const revenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        
        setStats({
          totalSales: orders.length,
          totalOrders: orders.length,
          totalProducts: products.length,
          revenue: revenue.toFixed(2)
        });
      } catch (error) {
        console.error('Error fetching stats', error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Revenue', value: `₹${stats.revenue}`, icon: IndianRupee, color: 'text-primary', glow: 'shadow-[0_0_20px_rgba(0,242,255,0.1)]' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-secondary', glow: 'shadow-[0_0_20px_rgba(188,19,254,0.1)]' },
    { label: 'Product Count', value: stats.totalProducts, icon: Package, color: 'text-accent', glow: 'shadow-[0_0_20px_rgba(57,255,20,0.1)]' },
    { label: 'Growth', value: '+12.5%', icon: TrendingUp, color: 'text-blue-400', glow: 'shadow-[0_0_20px_rgba(96,165,250,0.1)]' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
           <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">Dashboard</h2>
           <div className="flex items-center space-x-3 text-primary font-black uppercase text-[10px] tracking-[0.3em] animate-pulse">
              <Activity className="w-3 h-3" />
              <span>Real-time monitoring active</span>
           </div>
        </div>
        <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center space-x-4">
           <Zap className="w-5 h-5 text-accent" />
           <span className="text-xs font-black text-white uppercase tracking-widest italic">Admin Access Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, i) => (
          <div key={i} className={`glass-card p-10 border-white/5 hover:border-white/10 transition-all group ${stat.glow}`}>
            <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} mb-6 group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">{stat.label}</p>
              <h3 className="text-4xl font-black italic text-white tracking-tighter uppercase">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table View */}
      <div className="glass-card border-white/5 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.4)]">
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
           <h3 className="text-xl font-black italic text-white uppercase tracking-widest flex items-center gap-3">
              <Cpu className="w-5 h-5 text-primary" />
              Recent Orders
           </h3>
           <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View All</button>
        </div>
        <div className="p-4 space-y-3">
           {[1, 2, 3].map(i => (
             <div key={i} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center space-x-6">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary p-px">
                      <div className="w-full h-full rounded-full bg-cyber-dark flex items-center justify-center font-black text-white text-xs italic uppercase">JD</div>
                   </div>
                   <div>
                      <p className="font-black text-white uppercase italic tracking-widest text-sm">Customer #{i}</p>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">Order #OR-100-{i}</p>
                   </div>
                </div>
                <div className="text-right space-y-2">
                   <p className="text-xl font-black text-white italic tracking-tighter">₹1,229.99</p>
                   <div className="flex items-center justify-end space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                      <span className="text-[10px] font-black text-accent uppercase tracking-widest">Confirmed</span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
