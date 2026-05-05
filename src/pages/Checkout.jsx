import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, ChevronRight, Cpu, Terminal, MapPin } from 'lucide-react';
import useCartStore from '../store/useCartStore';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India'
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        orderItems: cartItems,
        shippingAddress: address,
        paymentMethod,
        totalPrice: getCartTotal(),
      };
      
      const { data } = await api.post('/orders', orderData);

      if (paymentMethod === 'Online') {
        // Mock payment processing
        toast.loading('Processing Payment...', { duration: 2000 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        await api.put(`/orders/${data._id}/pay`, {
          id: 'MOCK_PAY_ID_' + Math.random().toString(36).substr(2, 9),
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: 'customer@example.com'
        });
      }

      clearCart();
      toast.success('Order Placed Successfully');
      navigate('/success');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-12 cyber-grid min-h-screen px-6">
      <div className="flex items-end space-x-6">
         <h1 className="text-6xl font-black italic text-white uppercase tracking-tighter">Checkout</h1>
         <div className="h-10 w-px bg-white/10 hidden md:block"></div>
         <span className="text-primary font-black uppercase tracking-[0.4em] text-xs pb-2 animate-pulse">Confirm your order</span>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Shipping Information */}
        <div className="lg:col-span-2 space-y-10">
          <section className="glass-card p-10 border-white/5 space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <MapPin className="w-24 h-24 text-primary" />
            </div>
            <div className="flex items-center space-x-4 text-primary border-b border-white/5 pb-6">
              <Truck className="w-8 h-8" />
              <h2 className="text-2xl font-black italic text-white uppercase tracking-widest">Shipping Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Street Address</label>
                <input
                  required
                  className="neon-input w-full"
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  placeholder="Street name and number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">City</label>
                <input
                  required
                  className="neon-input w-full"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="Your City"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Postal Code</label>
                <input
                  required
                  className="neon-input w-full"
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  placeholder="Code"
                />
              </div>
            </div>
          </section>

          <section className="glass-card p-10 border-white/5 space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <CreditCard className="w-24 h-24 text-secondary" />
            </div>
            <div className="flex items-center space-x-4 text-secondary border-b border-white/5 pb-6">
              <CreditCard className="w-8 h-8" />
              <h2 className="text-2xl font-black italic text-white uppercase tracking-widest">Payment Method</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {[
                 { id: 'COD', title: 'Cash on Delivery', desc: 'Pay when you receive the order' },
                 { id: 'Online', title: 'Online Payment', desc: 'Pay securely online' }
               ].map((method) => (
                 <label 
                   key={method.id}
                   className={`p-8 rounded-3xl border-2 cursor-pointer transition-all space-y-3 relative overflow-hidden group ${
                     paymentMethod === method.id 
                       ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(0,242,255,0.1)]' 
                       : 'border-white/5 bg-white/5 hover:border-white/20'
                   }`}
                 >
                   <input 
                     type="radio" 
                     className="hidden" 
                     name="payment" 
                     value={method.id} 
                     checked={paymentMethod === method.id}
                     onChange={(e) => setPaymentMethod(e.target.value)}
                   />
                   <div className="flex items-center justify-between">
                      <h3 className={`font-black uppercase tracking-widest italic ${paymentMethod === method.id ? 'text-primary' : 'text-white'}`}>{method.title}</h3>
                      <div className={`w-4 h-4 rounded-full border-2 transition-all ${paymentMethod === method.id ? 'border-primary bg-primary scale-110' : 'border-white/20'}`}></div>
                   </div>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">{method.desc}</p>
                   {paymentMethod === method.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-pulse"></div>}
                 </label>
               ))}
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="glass-card p-10 space-y-10 sticky top-28 border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <div className="flex items-center space-x-3 text-primary">
               <Cpu className="w-6 h-6" />
               <h2 className="text-2xl font-black italic text-white uppercase tracking-widest">Order Summary</h2>
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-6 pr-4 custom-scrollbar">
               {cartItems.map(item => (
                 <div key={item.product} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                       <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary transition-colors">
                          <img src={item.image} alt="" className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-white uppercase tracking-wider line-clamp-1">{item.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{item.qty} units</p>
                       </div>
                    </div>
                    <span className="text-xs font-black text-white italic">₹{(item.price * item.qty).toFixed(2)}</span>
                 </div>
               ))}
            </div>

            <div className="pt-8 border-t border-white/5 space-y-6">
               <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-accent">FREE</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-white uppercase tracking-[0.2em]">Total</span>
                  <span className="text-4xl font-black text-primary italic tracking-tighter neon-text-glow">₹{getCartTotal()}</span>
               </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="neon-button-primary w-full py-6 uppercase italic tracking-[0.3em] group shadow-[0_0_20px_rgba(0,242,255,0.2)]"
            >
              {loading ? (
                 <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>Place Order</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
            
            <div className="flex items-center justify-center space-x-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] pt-4">
               <ShieldCheck className="w-4 h-4 text-accent" />
               <span>Hyper-Link Protected // SSL v4</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
