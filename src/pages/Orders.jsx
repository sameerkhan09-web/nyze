import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, CheckCircle, Truck, Terminal, Activity } from 'lucide-react';
import api from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/mine');
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders', error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'shipped': return <Truck className="w-4 h-4 text-primary" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12 px-6 cyber-grid min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-black italic text-white uppercase tracking-tighter">My Orders</h1>
          <div className="flex items-center space-x-3 text-primary font-black uppercase text-[10px] tracking-[0.4em] animate-pulse">
             <Activity className="w-3 h-3" />
             <span>History // {orders.length} Records found</span>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card p-16 text-center space-y-6 border-white/5">
           <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-slate-600">
              <Package className="w-10 h-10" />
           </div>
           <p className="text-slate-400 font-bold uppercase tracking-widest">No order transmissions found.</p>
           <Link to="/products" className="neon-button-primary inline-flex px-10 py-4 text-xs">Shop Now</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="glass-card border-white/5 hover:border-primary/20 transition-all group overflow-hidden">
               <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="flex items-center space-x-6">
                     <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-primary">
                        <Terminal className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Order Protocol ID</p>
                        <p className="text-sm font-black text-white uppercase tracking-tighter italic">#{order._id.slice(-12)}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-grow max-w-2xl px-4">
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Date</p>
                        <p className="text-xs font-bold text-white uppercase">{new Date(order.createdAt).toLocaleDateString()}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</p>
                        <div className="flex items-center space-x-2">
                           {getStatusIcon(order.status)}
                           <span className="text-xs font-bold text-white uppercase italic">{order.status}</span>
                        </div>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Items</p>
                        <p className="text-xs font-bold text-white uppercase">{order.orderItems.length} units</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total</p>
                        <p className="text-sm font-black text-primary italic tracking-tighter">₹{order.totalPrice}</p>
                     </div>
                  </div>

                  <div className="flex items-center justify-end">
                     <Link 
                       to={`/order/${order._id}`}
                       className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all text-slate-400 hover:text-primary group/btn"
                     >
                        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                     </Link>
                  </div>
               </div>
               
               {/* Mini Preview */}
               <div className="px-8 pb-8 pt-2 flex items-center space-x-3 overflow-x-auto no-scrollbar">
                  {order.orderItems.map((item, idx) => (
                     <div key={idx} className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-white/5">
                        <img src={item.image} className="w-full h-full object-cover" />
                     </div>
                  ))}
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
