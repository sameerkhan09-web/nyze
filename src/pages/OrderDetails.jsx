import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, MapPin, CreditCard, ChevronLeft, Terminal, Activity } from 'lucide-react';
import api from '../services/api';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order', error);
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  if (!order) return <div className="text-center text-white py-20">Order not found.</div>;

  const steps = [
    { id: 'pending', label: 'Order Confirmed', icon: Package, done: true },
    { id: 'shipped', label: 'In Transit', icon: Truck, done: order.status === 'shipped' || order.status === 'delivered' },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle, done: order.status === 'delivered' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-12 px-6 cyber-grid min-h-screen">
      <Link to="/orders" className="flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors group w-fit">
         <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
         <span>Back to Orders</span>
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter">Track Order</h1>
          <div className="flex items-center space-x-3 text-primary font-black uppercase text-[10px] tracking-[0.4em] animate-pulse">
             <Terminal className="w-3 h-3" />
             <span>Status: {order.status}</span>
          </div>
        </div>
      </div>

      {/* Tracking Visualizer */}
      <div className="glass-card p-10 border-white/5 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <div 
              className="h-full bg-primary shadow-[0_0_15px_#00F2FF] transition-all duration-1000" 
              style={{ width: order.status === 'delivered' ? '100%' : order.status === 'shipped' ? '50%' : '5%' }}
            ></div>
         </div>
         
         <div className="grid grid-cols-3 gap-4 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center space-y-4">
                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${step.done ? 'bg-primary border-primary text-black shadow-[0_0_20px_rgba(0,242,255,0.4)]' : 'bg-white/5 border-white/10 text-slate-600'}`}>
                    <step.icon className="w-6 h-6" />
                 </div>
                 <span className={`text-[10px] font-black uppercase tracking-widest text-center ${step.done ? 'text-white' : 'text-slate-600'}`}>{step.label}</span>
              </div>
            ))}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Order Items */}
         <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 border-white/5 space-y-8">
               <h2 className="text-xl font-black italic text-white uppercase tracking-widest border-b border-white/5 pb-4">Order Items</h2>
               <div className="space-y-6">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between group">
                       <div className="flex items-center space-x-6">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary transition-colors">
                             <img src={item.image} className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <p className="text-sm font-black text-white uppercase tracking-widest">{item.name}</p>
                             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">{item.qty} units @ ₹{item.price}</p>
                          </div>
                       </div>
                       <span className="text-lg font-black text-white italic tracking-tighter">₹{(item.qty * item.price).toFixed(2)}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Info Sidebar */}
         <div className="space-y-6">
            <div className="glass-card p-8 border-white/5 space-y-6">
               <div className="flex items-center space-x-3 text-primary">
                  <MapPin className="w-5 h-5" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Shipping Address</h3>
               </div>
               <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                  {order.shippingAddress.country}
               </div>
            </div>

            <div className="glass-card p-8 border-white/5 space-y-6">
               <div className="flex items-center space-x-3 text-secondary">
                  <CreditCard className="w-5 h-5" />
                  <h3 className="text-xs font-black uppercase tracking-widest">Payment Info</h3>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-slate-500 uppercase">Method</span>
                     <span className="text-[10px] font-black text-white uppercase">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black text-slate-500 uppercase">Status</span>
                     <span className={`text-[10px] font-black uppercase ${order.isPaid ? 'text-accent' : 'text-red-500'}`}>{order.isPaid ? 'PAID' : 'UNPAID'}</span>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                     <span className="text-sm font-black text-white uppercase">Total Paid</span>
                     <span className="text-2xl font-black text-primary italic tracking-tighter shadow-primary/20">₹{order.totalPrice}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OrderDetails;
