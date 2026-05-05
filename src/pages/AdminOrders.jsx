import { useState, useEffect } from 'react';
import { ShoppingBag, Eye, CheckCircle, Truck, Package, Cpu, Activity } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders', error);
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      toast.success(`Order status updated to ${status.toUpperCase()}`, {
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
      fetchOrders();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'delivered': return 'text-accent border-accent/20 bg-accent/5 shadow-[0_0_15px_rgba(57,255,20,0.1)]';
      case 'shipped': return 'text-blue-400 border-blue-400/20 bg-blue-400/5 shadow-[0_0_15px_rgba(96,165,250,0.1)]';
      default: return 'text-secondary border-secondary/20 bg-secondary/5 shadow-[0_0_15_rgba(188,19,254,0.1)]';
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-10 duration-500">
      <div className="space-y-2">
        <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">Orders</h2>
        <div className="flex items-center space-x-3 text-primary font-black uppercase text-[10px] tracking-[0.3em] animate-pulse">
           <Activity className="w-3 h-3" />
           <span>Recent orders: {orders.length}</span>
        </div>
      </div>

      <div className="glass-card border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.4)] relative overflow-hidden">
        {/* Top Scanner Line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-30"></div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                <th className="px-10 py-6 italic">Order ID</th>
                <th className="px-10 py-6 italic">Customer</th>
                <th className="px-10 py-6 italic">Date</th>
                <th className="px-10 py-6 italic">Total</th>
                <th className="px-10 py-6 italic">Payment</th>
                <th className="px-10 py-6 italic">Status</th>
                <th className="px-10 py-6 italic text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-10 py-6 font-black text-primary italic uppercase text-[10px] tracking-widest">
                    #{order._id.slice(-8)}
                  </td>
                  <td className="px-10 py-6">
                    <div className="space-y-1">
                       <span className="text-sm font-black italic text-white uppercase tracking-widest group-hover:text-primary transition-colors">{order.user?.name || 'GUEST_00'}</span>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{order.user?.email}</p>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-10 py-6">
                      <span className="text-xl font-black italic text-white tracking-tighter">₹{order.totalPrice}</span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="space-y-1">
                       <span className={`text-[9px] font-black uppercase tracking-widest ${order.isPaid ? 'text-accent' : 'text-red-500'}`}>
                          {order.isPaid ? 'Paid' : 'Unpaid'}
                       </span>
                       <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{order.paymentMethod}</p>
                       {order.paymentResult && (
                         <p className="text-[7px] text-primary/50 font-mono tracking-tighter truncate w-24">TXN: {order.paymentResult.id}</p>
                       )}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center justify-center space-x-3">
                       {order.status === 'pending' && (
                         <button 
                           onClick={() => updateStatus(order._id, 'shipped')}
                           className="p-3 bg-white/5 text-blue-400 border border-white/5 hover:border-blue-400 hover:bg-blue-400/10 rounded-xl transition-all"
                           title="Ship Order"
                         >
                           <Truck className="w-5 h-5" />
                         </button>
                       )}
                       {order.status === 'shipped' && (
                         <button 
                           onClick={() => updateStatus(order._id, 'delivered')}
                           className="p-3 bg-white/5 text-accent border border-white/5 hover:border-accent hover:bg-accent/10 rounded-xl transition-all"
                           title="Mark as Delivered"
                         >
                           <CheckCircle className="w-5 h-5" />
                         </button>
                       )}
                       <button className="p-3 bg-white/5 text-slate-400 border border-white/5 hover:border-white/50 hover:bg-white/10 rounded-xl transition-all">
                         <Eye className="w-5 h-5" />
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

export default AdminOrders;
