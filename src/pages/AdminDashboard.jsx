import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, MessageCircle, Terminal, Cpu, Zap } from 'lucide-react';
import AdminOverview from './AdminOverview';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminChat from './AdminChat';
import AdminAddProduct from './AdminAddProduct';

const AdminDashboard = () => {
  const location = useLocation();

  const sidebarLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Chat', path: '/admin/chat', icon: MessageCircle },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-12 min-h-[85vh] cyber-grid px-6 py-8">
      {/* Sidebar */}
      <aside className="lg:w-72 space-y-8">
        <div className="glass-card p-8 border-white/5 space-y-6 sticky top-28 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
          <div className="pb-6 border-b border-white/5 flex items-center space-x-3">
             <div className="bg-primary/10 p-2 rounded-xl text-primary">
                <Terminal className="w-6 h-6" />
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Admin Control</span>
                <span className="text-sm font-black italic text-white uppercase tracking-tighter">OS / NYZE 4.0</span>
             </div>
          </div>
          
          <nav className="space-y-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-4 px-6 py-4 rounded-2xl font-black uppercase italic tracking-widest text-xs transition-all relative overflow-hidden group ${
                  location.pathname === link.path || (link.path === '/admin/products' && location.pathname === '/admin/products/add')
                    ? 'bg-primary text-black shadow-[0_0_20px_rgba(0,242,255,0.3)]'
                    : 'text-slate-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                <link.icon className={`w-5 h-5 ${location.pathname === link.path || (link.path === '/admin/products' && location.pathname === '/admin/products/add') ? 'text-black' : 'group-hover:text-primary transition-colors'}`} />
                <span>{link.name}</span>
                {(location.pathname === link.path || (link.path === '/admin/products' && location.pathname === '/admin/products/add')) && <div className="absolute right-0 w-1 h-full bg-black/20"></div>}
              </Link>
            ))}
          </nav>

          <div className="pt-8 border-t border-white/5 space-y-6">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Core Temp</span>
                <span className="text-xs font-black text-accent">Stable</span>
             </div>
             <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary w-[65%] h-full animate-pulse shadow-[0_0_10px_#00F2FF]"></div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route index element={<AdminOverview />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AdminAddProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="chat" element={<AdminChat />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
